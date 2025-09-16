"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Trash2, Calculator } from "lucide-react"
import { Client, CreateQuoteFormData, CreateQuoteItemFormData, QuoteType, QuoteItemType } from "@/types"
import { apiService } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

const quoteItemSchema = z.object({
  type: z.nativeEnum(QuoteItemType),
  description: z.string().min(1, "Description requise"),
  detailedDescription: z.string().optional(),
  quantity: z.number().min(0.01, "Quantité requise"),
  unit: z.string().min(1, "Unité requise"),
  unitPrice: z.number().min(0, "Prix unitaire requis"),
  discount: z.number().min(0).max(100, "Remise entre 0 et 100%"),
  notes: z.string().optional(),
})

const createQuoteSchema = z.object({
  clientId: z.string().min(1, "Client requis"),
  type: z.nativeEnum(QuoteType),
  issueDate: z.string().min(1, "Date de création requise"),
  expiryDate: z.string().optional(),
  eventDate: z.string().optional(),
  location: z.string().optional(),
  description: z.string().min(1, "Description requise"),
  terms: z.string().optional(),
  notes: z.string().optional(),
  taxRate: z.number().min(0).max(100, "TVA entre 0 et 100%"),
  discountAmount: z.number().min(0, "Remise globale >= 0"),
  items: z.array(quoteItemSchema).min(1, "Au moins un élément requis"),
})

interface CreateQuoteFormProps {
  onSuccess?: (quote: any) => void
  onCancel?: () => void
}

export function CreateQuoteForm({ onSuccess, onCancel }: CreateQuoteFormProps) {
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showItemDialog, setShowItemDialog] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreateQuoteFormData>({
    resolver: zodResolver(createQuoteSchema),
    defaultValues: {
      type: QuoteType.EVENT,
      issueDate: new Date().toISOString().split('T')[0],
      taxRate: 20,
      discountAmount: 0,
      items: [],
    },
  })

  const watchedItems = watch('items')
  const watchedTaxRate = watch('taxRate')
  const watchedDiscountAmount = watch('discountAmount')

  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = async () => {
    try {
      const clientsData = await apiService.getClients({ isActive: true })
      setClients(clientsData)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les clients",
        variant: "destructive",
      })
    }
  }

  const addItem = (item: CreateQuoteItemFormData) => {
    const currentItems = watch('items')
    const newItem = {
      ...item,
      sortOrder: currentItems.length,
    }
    setValue('items', [...currentItems, newItem])
    setShowItemDialog(false)
  }

  const removeItem = (index: number) => {
    const currentItems = watch('items')
    const newItems = currentItems.filter((_, i) => i !== index)
    setValue('items', newItems.map((item, i) => ({ ...item, sortOrder: i })))
  }

  const calculateSubtotal = () => {
    return watchedItems.reduce((total, item) => {
      const itemTotal = item.quantity * item.unitPrice * (1 - item.discount / 100)
      return total + itemTotal
    }, 0)
  }

  const calculateTaxAmount = () => {
    return calculateSubtotal() * (watchedTaxRate / 100)
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTaxAmount() - watchedDiscountAmount
  }

  const onSubmit = async (data: CreateQuoteFormData) => {
    setIsLoading(true)
    try {
      const quoteData = {
        ...data,
        createdById: '35ce960f-22ec-4be7-884f-6e53ed9d3e12', // Test user ID
      }

      const newQuote = await apiService.createQuote(quoteData)
      
      toast({
        title: "Succès",
        description: "Devis créé avec succès",
        variant: "success",
      })

      reset()
      onSuccess?.(newQuote)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer le devis",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Informations générales */}
        <Card>
          <CardHeader>
            <CardTitle>Informations générales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientId">Client *</Label>
                <Select onValueChange={(value) => setValue('clientId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.clientId && (
                  <p className="text-sm text-red-600">{errors.clientId.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type *</Label>
                <Select onValueChange={(value: QuoteType) => setValue('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={QuoteType.EVENT}>Événement</SelectItem>
                    <SelectItem value={QuoteType.EQUIPMENT}>Équipement</SelectItem>
                    <SelectItem value={QuoteType.SERVICE}>Service</SelectItem>
                    <SelectItem value={QuoteType.MIXED}>Mixte</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-red-600">{errors.type.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="issueDate">Date de création *</Label>
                <Input
                  type="date"
                  {...register('issueDate')}
                  className={errors.issueDate ? 'border-red-500' : ''}
                />
                {errors.issueDate && (
                  <p className="text-sm text-red-600">{errors.issueDate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryDate">Date d'expiration</Label>
                <Input
                  type="date"
                  {...register('expiryDate')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                {...register('description')}
                placeholder="Description du devis..."
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && (
                <p className="text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Lieu</Label>
                <Input
                  {...register('location')}
                  placeholder="Lieu de l'événement..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventDate">Date de l'événement</Label>
                <Input
                  type="date"
                  {...register('eventDate')}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Éléments du devis */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Éléments du devis</CardTitle>
              <Dialog open={showItemDialog} onOpenChange={setShowItemDialog}>
                <DialogTrigger asChild>
                  <Button type="button" variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un élément
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ajouter un élément</DialogTitle>
                  </DialogHeader>
                  <QuoteItemForm onAdd={addItem} />
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {watchedItems.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Aucun élément ajouté
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Prix unit.</TableHead>
                    <TableHead>Remise</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {watchedItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.description}</p>
                          {item.detailedDescription && (
                            <p className="text-sm text-muted-foreground">
                              {item.detailedDescription}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{item.quantity} {item.unit}</TableCell>
                      <TableCell>{item.unitPrice.toFixed(2)} €</TableCell>
                      <TableCell>{item.discount}%</TableCell>
                      <TableCell>
                        {(item.quantity * item.unitPrice * (1 - item.discount / 100)).toFixed(2)} €
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Calculs et conditions */}
        <Card>
          <CardHeader>
            <CardTitle>Calculs et conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="taxRate">Taux de TVA (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  {...register('taxRate', { valueAsNumber: true })}
                  className={errors.taxRate ? 'border-red-500' : ''}
                />
                {errors.taxRate && (
                  <p className="text-sm text-red-600">{errors.taxRate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountAmount">Remise globale (€)</Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('discountAmount', { valueAsNumber: true })}
                  className={errors.discountAmount ? 'border-red-500' : ''}
                />
                {errors.discountAmount && (
                  <p className="text-sm text-red-600">{errors.discountAmount.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Total</Label>
                <div className="text-2xl font-bold text-primary">
                  {calculateTotal().toFixed(2)} €
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="terms">Conditions</Label>
              <Textarea
                {...register('terms')}
                placeholder="Conditions de vente..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                {...register('notes')}
                placeholder="Notes additionnelles..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Création..." : "Créer le devis"}
          </Button>
        </div>
      </form>
    </div>
  )
}

// Composant pour ajouter un élément
function QuoteItemForm({ onAdd }: { onAdd: (item: CreateQuoteItemFormData) => void }) {
  const [formData, setFormData] = useState<CreateQuoteItemFormData>({
    type: QuoteItemType.LABOR,
    description: '',
    detailedDescription: '',
    quantity: 1,
    unit: 'unité',
    unitPrice: 0,
    discount: 0,
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(formData)
    setFormData({
      type: QuoteItemType.LABOR,
      description: '',
      detailedDescription: '',
      quantity: 1,
      unit: 'unité',
      unitPrice: 0,
      discount: 0,
      notes: '',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Type</Label>
          <Select value={formData.type} onValueChange={(value: QuoteItemType) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={QuoteItemType.LABOR}>Main d'œuvre</SelectItem>
              <SelectItem value={QuoteItemType.EQUIPMENT}>Équipement</SelectItem>
              <SelectItem value={QuoteItemType.TRAVEL}>Déplacement</SelectItem>
              <SelectItem value={QuoteItemType.SERVICE}>Service</SelectItem>
              <SelectItem value={QuoteItemType.DISCOUNT}>Remise</SelectItem>
              <SelectItem value={QuoteItemType.OTHER}>Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Unité</Label>
          <Input
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            placeholder="unité, heure, jour..."
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Input
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Description de l'élément..."
        />
      </div>

      <div className="space-y-2">
        <Label>Description détaillée</Label>
        <Textarea
          value={formData.detailedDescription}
          onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
          placeholder="Description détaillée (optionnel)..."
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Quantité</Label>
          <Input
            type="number"
            step="0.01"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseFloat(e.target.value) || 0 })}
          />
        </div>

        <div className="space-y-2">
          <Label>Prix unitaire (€)</Label>
          <Input
            type="number"
            step="0.01"
            value={formData.unitPrice}
            onChange={(e) => setFormData({ ...formData, unitPrice: parseFloat(e.target.value) || 0 })}
          />
        </div>

        <div className="space-y-2">
          <Label>Remise (%)</Label>
          <Input
            type="number"
            step="0.1"
            value={formData.discount}
            onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) || 0 })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Notes</Label>
        <Textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Notes (optionnel)..."
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit">Ajouter</Button>
      </div>
    </form>
  )
}

"use client"

import { useState } from "react"
import { Quote, QuoteStatus, QuoteType } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Edit, Trash2, Plus, Search, Filter } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface QuotesTableProps {
  quotes: Quote[]
  onView?: (quote: Quote) => void
  onEdit?: (quote: Quote) => void
  onDelete?: (quote: Quote) => void
  onCreate?: () => void
}

const statusColors = {
  [QuoteStatus.DRAFT]: "bg-gray-100 text-gray-800",
  [QuoteStatus.SENT]: "bg-blue-100 text-blue-800",
  [QuoteStatus.ACCEPTED]: "bg-green-100 text-green-800",
  [QuoteStatus.REJECTED]: "bg-red-100 text-red-800",
  [QuoteStatus.EXPIRED]: "bg-yellow-100 text-yellow-800",
}

const typeColors = {
  [QuoteType.EVENT]: "bg-purple-100 text-purple-800",
  [QuoteType.EQUIPMENT]: "bg-orange-100 text-orange-800",
  [QuoteType.SERVICE]: "bg-indigo-100 text-indigo-800",
  [QuoteType.MIXED]: "bg-pink-100 text-pink-800",
}

export function QuotesTable({ 
  quotes, 
  onView, 
  onEdit, 
  onDelete, 
  onCreate 
}: QuotesTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [typeFilter, setTypeFilter] = useState<string>("ALL")

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch = 
      quote.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "ALL" || quote.status === statusFilter
    const matchesType = typeFilter === "ALL" || quote.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: fr })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-xl font-semibold">Devis</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-full sm:w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Tous</SelectItem>
                  <SelectItem value={QuoteStatus.DRAFT}>Brouillon</SelectItem>
                  <SelectItem value={QuoteStatus.SENT}>Envoyé</SelectItem>
                  <SelectItem value={QuoteStatus.ACCEPTED}>Accepté</SelectItem>
                  <SelectItem value={QuoteStatus.REJECTED}>Rejeté</SelectItem>
                  <SelectItem value={QuoteStatus.EXPIRED}>Expiré</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Tous</SelectItem>
                  <SelectItem value={QuoteType.EVENT}>Événement</SelectItem>
                  <SelectItem value={QuoteType.EQUIPMENT}>Équipement</SelectItem>
                  <SelectItem value={QuoteType.SERVICE}>Service</SelectItem>
                  <SelectItem value={QuoteType.MIXED}>Mixte</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {onCreate && (
              <Button onClick={onCreate} className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau devis
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° Devis</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Aucun devis trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredQuotes.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell className="font-medium">{quote.quoteNumber}</TableCell>
                    <TableCell>{quote.client?.name || 'Client non défini'}</TableCell>
                    <TableCell>
                      <Badge className={typeColors[quote.type]}>
                        {quote.type === QuoteType.EVENT && 'Événement'}
                        {quote.type === QuoteType.EQUIPMENT && 'Équipement'}
                        {quote.type === QuoteType.SERVICE && 'Service'}
                        {quote.type === QuoteType.MIXED && 'Mixte'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[quote.status]}>
                        {quote.status === QuoteStatus.DRAFT && 'Brouillon'}
                        {quote.status === QuoteStatus.SENT && 'Envoyé'}
                        {quote.status === QuoteStatus.ACCEPTED && 'Accepté'}
                        {quote.status === QuoteStatus.REJECTED && 'Rejeté'}
                        {quote.status === QuoteStatus.EXPIRED && 'Expiré'}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(quote.issueDate)}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(quote.total)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {onView && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onView(quote)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(quote)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(quote)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import {
   Table,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from './ui/table'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from './ui/select'
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from './ui/card'
import { Button } from './ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

const SelectTrans = () => {
   const [transporteurs, setTransporteurs] = useState([
      { id: '1', name: 'TNT' },
      { id: '2', name: 'Exapaq' },
      { id: '3', name: 'Chrono' },
      { id: '4', name: 'Ups' },
      { id: '5', name: 'Fedex' },
      { id: '6', name: 'Gls' },
      { id: '7', name: 'la Poste' },
      // Ajoutez d'autres transporteurs ici
   ])

   const router = useRouter()
   const searchParamsObject = useSearchParams()

   const selectedDateFromQuery = searchParamsObject.get('selectedDate')

   const [selectedTransporteur, setSelectedTransporteur] = useState('')
   const [quantiteColis, setQuantiteColis] = useState<number>(1)
   const [selectedTransporteursList, setSelectedTransporteursList] = useState<
      { id: string; transporteur: string; quantite: number }[]
   >([])
   
   const [selectedDate, setSelectedDate] = useState<string | null>(null)

   // Charger les données sauvegardées au chargement du composant
   useEffect(() => {
      if (selectedDateFromQuery) {
         console.log("Date sélectionnée depuis l'URL :", selectedDateFromQuery)
         // Mettez à jour l'état de la date sélectionnée
         setSelectedDate(selectedDateFromQuery)

         // Chargez les données en fonction de la date depuis le local storage
         const savedData = localStorage.getItem(selectedDateFromQuery)
         if (savedData) {
           setSelectedTransporteursList(JSON.parse(savedData))
           console.log(
             'Données chargées depuis le local storage:',
             JSON.parse(savedData)
             )
            }
          }
        }, [selectedDateFromQuery])
        
   // Sauvegarder les nouvelles données lorsque selectedTransporteursList change
   useEffect(() => {
      // Mettez à jour le local storage avec les nouvelles données
      if (selectedDate) {
         localStorage.setItem(
            selectedDate,
            JSON.stringify(selectedTransporteursList)
         )
         console.log(
            'Données sauvegardées dans le local storage:',
            selectedTransporteursList
         )
      }
   }, [selectedTransporteursList, selectedDate])

   const handleTransporterSelect = () => {
      if (selectedTransporteur && quantiteColis > 0) {
         const selectedTransporteurObject = transporteurs.find(
            (t) => t.id === selectedTransporteur
         )

         if (selectedTransporteurObject) {
            // Ajoutez les nouvelles données à selectedTransporteursList
            const newTransporteurData = {
               id: selectedTransporteurObject.id,
               transporteur: selectedTransporteurObject.name,
               quantite: quantiteColis,
            }

            setSelectedTransporteursList((prevList) => [
               ...prevList,
               newTransporteurData,
            ])

            setSelectedTransporteur('')
            setQuantiteColis(1)
         }
      }
   }

   const handleColisChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuantiteColis(parseInt(event.target.value, 10) || 1)
   }

   const totalColisCalculate = () => {
    let totalColis = 0
    for (const transporteur of selectedTransporteursList) {
      totalColis += transporteur.quantite
    }
    return totalColis
   }

   return (
      <div>
         <Card>
            <CardHeader>
               <CardTitle className="flex justify-center items-center p-4 text-xl" >Date : {selectedDateFromQuery && new Date(selectedDateFromQuery).toLocaleDateString()}</CardTitle>
               <CardDescription>
                  Veuillez sélectionner le nombre de colis pour chaque
                  Transporteur
               </CardDescription>
            </CardHeader>
            <CardContent>
               <label className="flex items-center pr-3">
                  Transporteur:
                  <select
                     className="w-[180px] h-auto bg-white border-2 flex m-auto p-2 border-cyan-400 rounded-lg"
                     value={selectedTransporteur}
                     onChange={(e) => setSelectedTransporteur(e.target.value)}
                  >
                     <option value="">Sélectionnez</option>
                     {transporteurs.map((t) => (
                        <option key={t.id} value={t.id}>
                           {t.name}
                        </option>
                     ))}
                  </select>
               </label>

               <label>
                  <span className="">Quantité de colis</span>
                  <Input
                     className="flex"
                     type="number"
                     onChange={handleColisChange}
                     value={quantiteColis}
                     placeholder="Quantité de colis"
                  />
               </label>

               <div className="flex p-4">
                  <Button
                     className="flex m-auto bg-[#041e4e]"
                     onClick={handleTransporterSelect}
                  >
                     Ajouter <ChevronRight className="text-[#fed401]"/>
                  </Button>
               </div>

               <div>
                  <Table>
                     <TableCaption className="  justify-center text-xl text-[#041e4e]   ">Colis reçus : {totalColisCalculate()} </TableCaption>
                     <TableHeader>
                        <TableRow>
                           <TableHead>ID</TableHead>
                           <TableHead>Transporteur</TableHead>
                           <TableHead>Quantité</TableHead>
                        </TableRow>
                     </TableHeader>
                     {selectedTransporteursList.map((t) => (
                        <TableRow key={t.id}>
                           <TableCell>{t.id}</TableCell>
                           <TableCell>{t.transporteur}</TableCell>
                           <TableCell>{t.quantite}</TableCell>
                        </TableRow>
                     ))}
                  </Table>
               </div>
            </CardContent>
         </Card>
      </div>
   )
}

export default SelectTrans

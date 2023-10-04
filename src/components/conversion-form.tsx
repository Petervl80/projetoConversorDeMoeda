import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { COUNTRY_LIST } from "@/utils/country-list"
import { Button } from "./ui/button"
import { ChartLine, SpinnerGap } from "@phosphor-icons/react"
import { useState } from "react"

const formSchema = z.object({
  amount: z.coerce.number({
    invalid_type_error: "Digite um número válido",
    required_error: "Digite um número válido",
  })
    .positive("Digite um número válido"),
  from: z.string({
    required_error: "Selecione uma moeda",
  })
    .nonempty("Selecione uma moeda"),
  to: z.string({
    required_error: "Selecione uma moeda",
  })
    .nonempty("Selecione uma moeda"),
})

export function ConversionForm() {
  const [convertedExchange, setConvertedExchange] = useState<null | string>(null)
  const [converted, setConverted] = useState<null | number>(null)
  const [isConverting, setIsConverting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsConverting(true)

    const response = await fetch(`https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_EXCHANGERATE_API}/latest/${values.from}`)
    const data = await response.json()

    const converted = values.amount * data.conversion_rates[values.to]
    setConverted(converted)
    setConvertedExchange(values.to)
    setIsConverting(false)
  }

  const sortedCountriesByValue = Object.entries(COUNTRY_LIST).sort(([, a], [, b]) => a.localeCompare(b))

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input
                  onChange={event => field.onChange(event.target.valueAsNumber)}
                  placeholder="Valor para ser convertido"
                  type="number"
                  min={0} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem>
                <FormLabel>De</FormLabel>

                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma moeda" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="overflow-y-auto max-h-96">
                    {sortedCountriesByValue.map(([country, countryName]) => (
                      <SelectItem key={country} value={country}>{countryName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Para</FormLabel>

                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma moeda" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="overflow-y-auto max-h-96">
                    {sortedCountriesByValue.map(([country, countryName]) => (
                      <SelectItem key={country} value={country}>{countryName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center">
          {isConverting && (
            <SpinnerGap className="h-5 w-5 text-muted-foreground animate-spin" />
          )}

          {converted && convertedExchange && !isConverting && (
            <strong className="text-primary text-lg">
              {converted.toLocaleString("pt-BR", {
                style: "currency",
                currency: convertedExchange,
              })}
            </strong>
          )}

          <Button className="flex ml-auto" disabled={isConverting || !form.formState.isValid}>
            <ChartLine className="w-5 h-5 mr-1" />
            Converter
          </Button>
        </div>
      </form>
    </Form>
  )
}
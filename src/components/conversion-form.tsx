import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { ChartLine, SpinnerGap } from "@phosphor-icons/react"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

import { useState } from "react"

import { COUNTRY_LIST } from "@/utils/country-list"

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

    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_EXCHANGERATE_API}/latest/${values.from}`)
      const data = await response.json()

      const converted = values.amount * data.conversion_rates[values.to]
      setConverted(converted)
      setConvertedExchange(values.to)
    } catch (error) {
      console.error(error)
    }

    setIsConverting(false)
  }

  const sortedCountriesByValue = Object.entries(COUNTRY_LIST).sort(([, a], [, b]) => a.name.localeCompare(b.name))
  const convertedIso = convertedExchange ? sortedCountriesByValue.find(([country]) => country === convertedExchange)?.[1].iso : null

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
                  min={0}
                  step={0.01} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-rows-2 sm:grid-rows-none sm:grid-cols-2 gap-3 sm:gap-4">
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
                    {sortedCountriesByValue.map(([country, countryOBJ]) => (
                      <SelectItem key={country} value={country}>
                        <img
                          className="w-5 h-5 object-contain mr-2 inline-block"
                          src={`https://flagsapi.com/${countryOBJ.iso.toUpperCase()}/flat/64.png`}
                          alt={countryOBJ.iso}
                          loading="lazy"
                          draggable={false} />
                        {countryOBJ.name}
                      </SelectItem>
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
                    {sortedCountriesByValue.map(([country, countryOBJ]) => (
                      <SelectItem key={country} value={country}>
                        <img
                          className="w-5 h-5 object-contain mr-2 inline-block"
                          src={`https://flagsapi.com/${countryOBJ.iso.toUpperCase()}/flat/64.png`}
                          alt={countryOBJ.iso}
                          loading="lazy"
                          draggable={false} />
                        {countryOBJ.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-wrap items-center">
          {isConverting && (
            <SpinnerGap className="h-5 w-5 text-muted-foreground animate-spin" />
          )}

          {converted && convertedExchange && !isConverting && (
            <div className="flex">
              <img
                className="w-7 h-7 object-contain mr-2 inline-block"
                src={`https://flagsapi.com/${convertedIso}/flat/64.png`}
                alt={convertedExchange}
                loading="lazy"
                draggable={false} />


              <strong className="text-primary text-lg break-all mr-1">
                {converted.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: convertedExchange,
                })}
              </strong>
            </div>
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
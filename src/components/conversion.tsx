import { ArrowsLeftRight, CurrencyDollar, ArrowRight } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ConversionForm } from "./conversion-form";

export function Conversion() {
  return (
    <>
      <h2 className="text-3xl font-bold text-center sm:text-start">
        Converter moeda
      </h2>

      <div className="grid grid-rows-2 sm:grid-rows-none sm:grid-cols-2 gap-3 sm:gap-4 mt-6 mb-3 sm:my-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de conversões
            </CardTitle>
            <ArrowsLeftRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(4523189).toLocaleString("pt-BR")}
            </div>
            <p className="text-xs text-muted-foreground">
              +20,1% desde o último mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Mais frequente
            </CardTitle>

            <CurrencyDollar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              BRL

              <ArrowRight className="text-muted-foreground" />

              USD
            </div>
            <p className="text-xs text-muted-foreground">
              80,1% das conversões
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Converter</CardTitle>
        </CardHeader>
        <CardContent>
          <ConversionForm />
        </CardContent>
      </Card>
    </>
  )
}
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PaperPlaneTilt, SpinnerGap } from "@phosphor-icons/react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { useState } from "react"

const formSchema = z.object({
  email: z.string({
    required_error: "O e-mail é obrigatório",
    description: "meuemail@outlook.com",
  })
    .email("Digite um e-mail válido"),
  subject: z.string()
    .min(5, "O assunto deve ter no mínimo 5 caracteres"),
  message: z.string()
    .min(10, "A mensagem deve ter no mínimo 10 caracteres"),
})

export function ContactForm() {
  const [isSending, setIsSending] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSending(true)

    console.log(values)


    setIsSending(false)
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  onChange={event => field.onChange(event.target.value)}
                  placeholder="Digite seu email"
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assunto</FormLabel>
              <FormControl>
                <Input
                  onChange={event => field.onChange(event.target.value)}
                  placeholder="Digite o assunto"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem</FormLabel>
              <FormControl>
                <Textarea
                  onChange={event => field.onChange(event.target.value)}
                  placeholder="Digite a mensagem"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center">
          {isSending && (
            <SpinnerGap className="h-5 w-5 text-muted-foreground animate-spin" />
          )}

          <Button className="flex ml-auto" disabled={isSending || !form.formState.isValid}>
            <PaperPlaneTilt className="w-5 h-5 mr-1" />
            Enviar
          </Button>
        </div>
      </form>
    </Form>
  )
}
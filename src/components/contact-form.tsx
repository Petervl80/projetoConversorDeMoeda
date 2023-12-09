import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SpinnerGap, WhatsappLogo } from "@phosphor-icons/react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { useState } from "react"

const formSchema = z.object({
  name: z.string({
    required_error: "O nome é obrigatório",
  })
    .min(3, "O nome deve ter no mínimo 3 caracteres"),
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

    const WHATSAPP_TEXT =
      `Olá, me chamo *${values.name}* e gostaria de falar sobre *${values.subject}*.\n\n${values.message}`.trim()

    window.open(`https://api.whatsapp.com/send?phone=${encodeURIComponent("+5581985309916")}&text=${encodeURIComponent(WHATSAPP_TEXT)}`, "_blank");

    setIsSending(false)
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  onChange={event => field.onChange(event.target.value)}
                  placeholder="Digite seu nome"
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
            <WhatsappLogo className="w-5 h-5 mr-1" />
            Conversar
          </Button>
        </div>
      </form>
    </Form>
  )
}

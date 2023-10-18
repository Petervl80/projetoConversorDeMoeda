import { Coins } from "@phosphor-icons/react";
import { Separator } from "./ui/separator";

export function MainNav() {
  return (
    <nav className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 px-4 sm:px-0">
      <a
        className="flex items-center gap-2 text-sm font-bold uppercase"
        href="/">
        <Coins className="w-7 h-7 text-primary" />
        Conversor de moedas
      </a>

      <Separator orientation="vertical" className="hidden sm:block h-8" />

      <div className="space-x-6">
        <a
          className="text-sm font-medium text-muted-foreground hover:text-primary"
          href="#">
          Início
        </a>

        <a
          className="text-sm font-medium text-muted-foreground hover:text-primary"
          href="#about">
          Sobre
        </a>

        <a
          className="text-sm font-medium text-muted-foreground hover:text-primary"
          href="#contact">
          Contato
        </a>
      </div>
    </nav>
  )
}
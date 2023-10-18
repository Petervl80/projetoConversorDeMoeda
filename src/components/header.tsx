import { MainNav } from "./main-nav"
import { Button } from "./ui/button"

import { ChartLine } from "@phosphor-icons/react"

export function Header() {
  return (
    <header className="h-24 sm:h-16 border-b">

      <div className="max-w-6xl mx-auto h-full flex items-center justify-center sm:justify-between px-4">
        <MainNav />

        <Button className="hidden sm:flex">
          <ChartLine className="w-5 h-5 mr-1" />
          Converter
        </Button>
      </div>

    </header>
  )
}
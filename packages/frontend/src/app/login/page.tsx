import { Music } from "lucide-react"
import Image from "next/image"

import { LoginForm } from "@/components/login-form"
export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-black text-white">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1DB954] text-black">
              <Music className="size-5" />
            </div>
            <span className="text-xl font-bold">Simplify</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1DB954]/30 to-black/90 z-10"></div>
        <Image
          src="/LoginIcon.png"
          alt="Music visualization"
          className="absolute inset-0 h-full w-full object-cover"
          width={120}
          height={120}
          priority
          quality={100}
        />
        <div className="absolute bottom-10 left-10 z-20 max-w-md">
          <h2 className="text-4xl font-bold mb-4">Your music, anywhere</h2>
          <p className="text-lg opacity-80">
            Stream millions of songs and podcasts on the go. Listen to the music you love and discover new content.
          </p>
        </div>
      </div>
    </div>
  )
}


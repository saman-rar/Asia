"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentView, setCurrentView] = useState<"login" | "register" | "forgot">("login")

  return (
    <div className="min-h-screen flex font-sans">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary-light">
        <div className="relative z-10 flex flex-col justify-between w-full px-12 py-12">
          <div className="flex items-center">
            <h1 className="text-3xl font-semibold text-white">آسیا</h1>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-4xl text-white mb-6 leading-13">انواع موبایل و لوازم جانبی برند های محبوب با کیفیت بالا و قیمت اقتصادی</h2>
            <p className="text-white/90 text-lg leading-relaxed">
                برای افزودن ادرس و سفارش محصولات ورود و یا ثبت نام کنید.
            </p>
          </div>

          <div className="flex justify-between items-center text-white/70 text-sm">
            <span>Copyright © 2026 Asia corporate & Saman.rar design</span>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden text-center mb-8">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-3 bg-primary-light"
            >
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <h1 className="text-xl font-semibold text-foreground">آسیا</h1>
          </div>

          <div className="space-y-6">
            <div className="space-y-3 text-center">
              <h2 className="text-3xl text-primary-light">
                خوش آمدید
              </h2>
              <p className="text-muted-foreground">
                شماره تلفن خود را جهت ورود یا ثبت نام وارد کنید.
              </p>
            </div>

            <div className="space-y-4">
              {currentView === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-background">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="h-12 border-gray-200 focus:ring-0 shadow-none rounded-lg bg-white focus:border-[#3F3FF3]"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="number" className="text-sm font-medium text-background">
                  شماره موبایل
                </Label>
                <Input
                  id="number"
                  type="number"
                  placeholder="09120000000"
                  className="h-12 border-gray-200 focus:ring-0 shadow-none rounded-lg bg-white focus:border-[#3F3FF3]"
                />
              </div>

              {currentView === "login" && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="remember" className="rounded border-gray-300 cursor-pointer" />
                    <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                      مرا به خاطر بسپار
                    </Label>
                  </div>
                </div>
              )}
            </div>

            <Button
              className="w-full h-12 text-sm font-medium text-white hover:opacity-90 rounded-lg shadow-none cursor-pointer bg-primary-light"
            >

              ورود به فروشگاه آسیا
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

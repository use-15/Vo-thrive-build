"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useAuthStore } from "@/lib/store"
import { Shield, Trash2, Download, AlertTriangle } from "lucide-react"

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type PasswordForm = z.infer<typeof passwordSchema>

export default function AccountPage() {
  const [isPasswordLoading, setIsPasswordLoading] = useState(false)
  const [isExportLoading, setIsExportLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const { user, logout } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  })

  const onPasswordSubmit = async (data: PasswordForm) => {
    setIsPasswordLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Password updated successfully!")
      reset()
    } catch (error) {
      alert("Failed to update password. Please try again.")
    } finally {
      setIsPasswordLoading(false)
    }
  }

  const exportData = async () => {
    setIsExportLoading(true)
    try {
      // Simulate data export
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create mock data export
      const exportData = {
        user: user,
        habits: ["Morning Meditation", "Evening Walk", "Gratitude Journal"],
        progress: "7 day streak",
        exportDate: new Date().toISOString(),
      }

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "thrive-data-export.json"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      alert("Failed to export data. Please try again.")
    } finally {
      setIsExportLoading(false)
    }
  }

  const deleteAccount = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Account deletion initiated. You will receive a confirmation email.")
      logout()
    } catch (error) {
      alert("Failed to delete account. Please try again.")
    }
  }

  return (
    <div className="space-y-6">
      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Security
          </CardTitle>
          <CardDescription>Manage your account security and password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="currentPassword" className="text-sm font-medium">
                Current Password
              </label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Enter your current password"
                error={!!errors.currentPassword}
                {...register("currentPassword")}
              />
              {errors.currentPassword && <p className="text-sm text-error">{errors.currentPassword.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="newPassword" className="text-sm font-medium">
                New Password
              </label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter your new password"
                error={!!errors.newPassword}
                {...register("newPassword")}
              />
              {errors.newPassword && <p className="text-sm text-error">{errors.newPassword.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm New Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                error={!!errors.confirmPassword}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && <p className="text-sm text-error">{errors.confirmPassword.message}</p>}
            </div>

            <Button type="submit" isLoading={isPasswordLoading}>
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Data Export */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Data Export
          </CardTitle>
          <CardDescription>Download a copy of your personal data</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Export your profile information, habits, progress data, and content preferences. This may take a few minutes
            to prepare.
          </p>
          <Button onClick={exportData} isLoading={isExportLoading} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export My Data
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center text-red-600">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Danger Zone
          </CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-red-200 rounded-lg bg-red-50">
              <h3 className="font-medium text-red-800 mb-2">Delete Account</h3>
              <p className="text-sm text-red-700 mb-4">
                Once you delete your account, there is no going back. Please be certain. All your data, including
                habits, progress, and preferences will be permanently deleted.
              </p>

              {!showDeleteConfirm ? (
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="border-red-300 text-red-700 hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-red-800">
                    Are you absolutely sure? This action cannot be undone.
                  </p>
                  <div className="flex space-x-3">
                    <Button onClick={deleteAccount} className="bg-red-600 hover:bg-red-700 text-white">
                      Yes, Delete My Account
                    </Button>
                    <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

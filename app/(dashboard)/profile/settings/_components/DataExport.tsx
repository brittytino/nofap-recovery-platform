'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, FileJson, FileText, Database } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface DataExportProps {
  userId: string
}

export function DataExport({ userId }: DataExportProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async (format: 'json' | 'csv') => {
    setIsExporting(true)
    try {
      const response = await fetch(`/api/user/export?userId=${userId}&format=${format}`)
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `recovery-platform-data-${Date.now()}.${format}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        toast.success('Data exported successfully')
      } else {
        toast.error('Failed to export data')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsExporting(false)
    }
  }

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    )
    
    if (!confirmed) return

    try {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })

      if (response.ok) {
        toast.success('Account deleted successfully')
        window.location.href = '/login'
      } else {
        toast.error('Failed to delete account')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Data & Privacy</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
          <Database className="text-blue-600 mt-0.5" size={20} />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Export Your Data</p>
            <p className="text-xs text-gray-600 mt-1">
              Download a copy of all your data stored in the platform
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => handleExport('json')}
            disabled={isExporting}
            className="flex items-center justify-center space-x-2"
          >
            <FileJson size={16} />
            <span>Export JSON</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleExport('csv')}
            disabled={isExporting}
            className="flex items-center justify-center space-x-2"
          >
            <FileText size={16} />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h4 className="text-base font-semibold text-gray-900 mb-2">Danger Zone</h4>
        <p className="text-sm text-gray-600 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button
          variant="destructive"
          onClick={handleDeleteAccount}
          className="w-full"
        >
          Delete Account
        </Button>
      </div>
    </Card>
  )
}


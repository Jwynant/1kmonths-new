import React, { useState } from 'react'
import { Share2 } from 'lucide-react'

interface ShareButtonProps {
  isDarkMode: boolean
}

const ShareButton: React.FC<ShareButtonProps> = ({ isDarkMode }) => {
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async () => {
    setIsSharing(true)
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    } catch (error) {
      console.error('Error copying to clipboard:', error)
      alert('Failed to copy link. Please try again.')
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <button
      onClick={handleShare}
      disabled={isSharing}
      className={`p-2 rounded-full transition-colors ${
        isDarkMode
          ? 'text-white hover:bg-gray-800'
          : 'text-black hover:bg-gray-200'
      }`}
      title="Share"
    >
      <Share2 className="w-6 h-6" />
    </button>
  )
}

export default ShareButton
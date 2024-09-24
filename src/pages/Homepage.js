import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Brain, Camera, MessageSquare } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const features = [
    {
      icon: <Camera className="h-6 w-6 text-blue-500" />,
      title: "Upload Your Image",
      description: "Start by uploading any image you want to caption.",
      image: "/placeholder.svg?height=200&width=300",
      caption: "A person holding a camera, ready to take a picture"
    },
    {
      icon: <Brain className="h-6 w-6 text-purple-500" />,
      title: "AI Processing",
      description: "Our advanced AI analyzes your image in seconds.",
      image: "/placeholder.svg?height=200&width=300",
      caption: "A futuristic representation of AI processing visual data"
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-green-500" />,
      title: "Get Your Caption",
      description: "Receive an accurate and creative caption for your image.",
      image: "/placeholder.svg?height=200&width=300",
      caption: "A smartphone displaying a captioned image on social media"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">AI Image Captioner</Link>
          <nav>
            <Button asChild>
              <Link href="/login">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Transform Your Images with AI-Powered Captions</h1>
          <p className="text-xl text-gray-600 mb-8">Upload an image, and our AI will generate a creative and accurate caption in seconds.</p>
          <Button size="lg" asChild>
            <Link href="/login">
              Try It Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h2 className="text-xl font-semibold ml-2">{feature.title}</h2>
                </div>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="relative h-48 mb-4">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <p className="text-sm text-gray-500 italic">{feature.caption}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Caption Your Images?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of users who are already enhancing their images with AI-generated captions.</p>
          <Button size="lg" asChild>
            <Link href="/login">Get Started Now</Link>
          </Button>
        </section>
      </main>

      <footer className="bg-gray-100 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2023 AI Image Captioner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
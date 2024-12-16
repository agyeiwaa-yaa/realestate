import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="bg-orange-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">About Actual Real Estate</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="About Actual Real Estate"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Actual Real Estate is a leading property marketplace dedicated to helping people find their perfect homes. With years of experience in the real estate industry, we've built a platform that connects buyers, sellers, and agents seamlessly.
            </p>
            <p className="text-lg text-gray-700">
              Our mission is to make the process of buying, selling, or renting properties as smooth and efficient as possible. We leverage cutting-edge technology and industry expertise to provide a user-friendly experience for all our clients.
            </p>
            <p className="text-lg text-gray-700">
              At Actual Real Estate, we believe in transparency, integrity, and exceptional customer service. Our team of experienced professionals is always ready to assist you in your real estate journey.
            </p>
          </div>
        </div>
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-orange-500">Trust</h3>
              <p className="text-gray-700">We build lasting relationships based on trust and reliability.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-orange-500">Innovation</h3>
              <p className="text-gray-700">We constantly innovate to improve our services and user experience.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-orange-500">Excellence</h3>
              <p className="text-gray-700">We strive for excellence in every aspect of our business.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


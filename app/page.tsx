"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Share2, Facebook, Twitter, Linkedin, Instagram, MessageCircle, Search, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { clear } from "console"

// Popular locations for suggestions
const popularLocations = [
  // States
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",

  // Union Territories
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];


export default function HistoricalFactsApp() {
  const [location, setLocation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [fact, setFact] = useState<{ text: string; location: string } | null>(null)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Filter suggestions based on input
  useEffect(() => {
    if (location.trim() === "") {
      setSuggestions([])
      return
    }

    const filtered = popularLocations.filter((loc) => loc.toLowerCase().includes(location.toLowerCase())).slice(0, 5) // Limit to 5 suggestions

    setSuggestions(filtered)
  }, [location])

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const fetchHistoricalFact = async () => {
    if (!location.trim()) {
      toast({
        title: "Location required",
        description: "Please enter a location to discover historical facts.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setShowSuggestions(false)

    try {
      // In a real app, this would be an API call to a historical facts service
      // For demo purposes, we'll create more detailed mock data based on location
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // More detailed location-based facts
      const locationFacts = {
        "uttar pradesh": [
          "The city of Varanasi is one of the world's oldest continuously inhabited cities, believed to be over 3,000 years old.",
          "The Taj Mahal in Agra was commissioned in 1632 by Mughal emperor Shah Jahan and is one of the Seven Wonders of the World.",
          "Fatehpur Sikri, a UNESCO World Heritage Site, was once the capital of the Mughal Empire under Emperor Akbar."
        ],
        "maharashtra": [
          "Chhatrapati Shivaji Maharaj, the founder of the Maratha Empire, was born in the Shivneri Fort located in Maharashtra.",
          "The Ajanta and Ellora caves near Aurangabad are ancient rock-cut Buddhist cave monuments, dating from the 2nd century BCE.",
          "Mumbai was originally a group of seven islands and was given to the British as part of the dowry when Catherine of Braganza married Charles II."
        ],
        "tamil nadu": [
          "The Brihadeeswarar Temple in Thanjavur, built over 1,000 years ago by Raja Raja Chola I, is a UNESCO World Heritage Site.",
          "Madurai's Meenakshi Temple dates back to the 6th century BCE and is a major center of Tamil culture and architecture.",
          "Kancheepuram, known as the 'City of Thousand Temples', was once the capital of the Pallava dynasty."
        ],
        "delhi": [
          "Delhi has been the capital for many ancient empires, including the Delhi Sultanate and the Mughal Empire.",
          "Qutub Minar, the tallest brick minaret in the world, was started by Qutb-ud-din Aibak in 1192.",
          "The Red Fort was constructed by Shah Jahan in 1639 when he moved the Mughal capital from Agra to Delhi."
        ],
        "rajasthan": [
          "Rajasthan is home to the Thar Desert and the Rajput warrior clans who built grand forts and palaces across the region.",
          "The city of Jaipur, also known as the Pink City, was founded in 1727 by Maharaja Sawai Jai Singh II.",
          "Mehrangarh Fort in Jodhpur is one of the largest forts in India and stands on a perpendicular cliff, four hundred feet above the skyline."
        ],
        "jammu and kashmir": [
          "According to the history of Jammu & Kashmir, Maharaja Hari Singh was the last ruling Maharaja of the princely state.",
          "Srinagar was founded by Emperor Ashoka and not the Mughal emperor Jahangir.",
          "The ruins of the Martand Sun Temple, built in the 8th century CE by Lalitaditya Muktapida, still stand in Kashmir."
        ],
        "gujarat": [
          "The ancient city of Lothal in Gujarat was one of the southernmost cities of the Indus Valley Civilization, famous for its dockyard.",
          "Gujarat was the birthplace of Mahatma Gandhi, who led India's nonviolent struggle for independence.",
          "Dwarka, in Gujarat, is one of the seven most ancient religious cities in India and believed to be the ancient kingdom of Lord Krishna."
        ],
        "andhra pradesh": [
          "Amaravati, the ancient capital of the Satavahana dynasty, was a major Buddhist learning center in ancient India.",
          "The famous Lepakshi Temple, known for its hanging pillar and intricate carvings, dates back to the 16th century.",
          "Andhra Pradesh is home to the world’s second-longest beach road, from Vishakhapatnam to Bheemili."
        ],
      
        "arunachal pradesh": [
          "Arunachal Pradesh is known as the ‘Land of the Rising Sun’ because it sees the first sunrise in India.",
          "The 400-year-old Tawang Monastery is the largest in India and the second largest in the world after Lhasa’s Potala Palace.",
          "The state was historically part of the ancient kingdom of Tibet and was later integrated into British India during the colonial period."
        ],
      
        "assam": [
          "Assam was the seat of the Ahom dynasty, which ruled for nearly 600 years and successfully resisted Mughal invasions.",
          "The ancient Kamakhya Temple in Guwahati is one of the oldest and most revered Tantric temples in India.",
          "The Battle of Saraighat (1671) was fought here on the Brahmaputra River, where Ahom General Lachit Borphukan defeated the Mughals."
        ],
      
        "bihar": [
          "Bihar was the center of the ancient Magadha empire, which gave rise to dynasties like the Mauryas and Guptas.",
          "Gaya and Bodh Gaya are sacred places where Siddhartha Gautama attained enlightenment and became the Buddha.",
          "Nalanda University, founded in the 5th century, was one of the world’s first residential universities with over 10,000 students."
        ],
      
        "chhattisgarh": [
          "The region of Chhattisgarh was part of the Dakshina Kosala kingdom, mentioned in the Ramayana as the kingdom of Lord Rama's mother Kaushalya.",
          "The Sirpur archaeological site has revealed ruins of an ancient Buddhist university and temples from the 5th to 12th centuries.",
          "Bastar in Chhattisgarh is known for the Dussehra celebration that lasts 75 days—one of the longest festivals in the world."
        ],
        "goa": [
          "Goa was a Portuguese colony for over 450 years, from 1510 to 1961, making it one of the longest-held colonial territories in India.",
          "The Basilica of Bom Jesus in Goa is a UNESCO World Heritage Site and houses the mortal remains of St. Francis Xavier.",
          "Goa’s Liberation Day is celebrated on December 19th, 1961, when it was annexed by India through Operation Vijay."
        ],
      
        "haryana": [
          "The epic battle of Mahabharata was fought in Kurukshetra, Haryana, and it's said to be the site where Lord Krishna delivered the Bhagavad Gita.",
          "Haryana was carved out of the former state of Punjab in 1966 to form a separate Hindi-speaking state.",
          "Panipat in Haryana was the site of three major historical battles that changed the course of Indian history."
        ],
      
        "himachal pradesh": [
          "The region was known as 'Dev Bhoomi' or 'Land of the Gods' due to its many temples and spiritual sites.",
          "During British rule, Shimla served as the summer capital of British India and hosted many crucial decisions of the Raj.",
          "The Great Himalayan National Park in Himachal is a UNESCO World Heritage Site, rich in biodiversity and natural history."
        ],
      
        "jharkhand": [
          "Jharkhand was part of the ancient Magadha Empire and later a significant region during the Munda and Santhal tribal revolts against British rule.",
          "The state was carved out of Bihar on November 15, 2000, and is rich in minerals, often called the ‘storehouse of minerals’ in India.",
          "Birsa Munda, a tribal freedom fighter from Jharkhand, led a strong rebellion against British colonial rule in the late 19th century."
        ],
      
        "karnataka": [
          "Hampi, a UNESCO World Heritage Site in Karnataka, was the capital of the Vijayanagara Empire and a major cultural and trading center.",
          "The Chalukyas and Hoysalas ruled parts of Karnataka and built architectural marvels like the temples at Badami, Aihole, and Halebidu.",
          "Tipu Sultan, known as the Tiger of Mysore, fiercely resisted British rule in the late 18th century and died in battle in 1799."
        ],
      
        "kerala": [
          "Kerala is mentioned in ancient Sanskrit texts and was known for its trade in spices, especially black pepper and cardamom, with the Greeks and Romans.",
          "The Chera dynasty, one of the ancient Tamil dynasties, ruled parts of present-day Kerala and were known for their maritime prowess.",
          "The Synagogue in Kochi, built in 1568, is the oldest active synagogue in the Commonwealth of Nations."
        ],
        "madhya pradesh": [
          "Madhya Pradesh is known as the 'Heart of India' due to its geographical location and was once home to the powerful Maurya and Gupta Empires.",
          "The Bhimbetka rock shelters, a UNESCO World Heritage Site, have some of the oldest cave paintings in the world, dating back over 30,000 years.",
          "Ujjain, one of the four sites of the Kumbh Mela, was a major center for astronomy and learning in ancient India."
        ],
      
        "manipur": [
          "Manipur was once an independent kingdom and merged with India in 1949 through the Manipur Merger Agreement.",
          "The Manipuri dance form, one of the eight classical dances of India, is deeply rooted in Vaishnavism and is known for its grace and devotion.",
          "During World War II, Manipur was a key battlefield between British and Japanese forces, especially around Imphal."
        ],
      
        "mizoram": [
          "Mizoram became the 23rd state of India in 1987 after a peace accord was signed between the Government of India and the Mizo National Front.",
          "The Mizo people are believed to have migrated from China through Myanmar several centuries ago, bringing with them a rich cultural heritage.",
          "Chapchar Kut is one of the most important traditional festivals in Mizoram, celebrated during spring after clearing forests for cultivation."
        ],
      
        "nagaland": [
          "Nagaland became the 16th state of India in 1963, and its capital Kohima was the site of a major battle during World War II, where Indian and Allied forces stopped the Japanese advance into India.",
          "The Nagas are composed of several tribes, each with its distinct customs, languages, and traditional attire.",
          "The Hornbill Festival, celebrated in December, showcases the cultural richness of all Naga tribes and is known as the 'Festival of Festivals'."
        ],
      
        "meghalaya": [
          "Meghalaya, meaning 'abode of clouds', became a full-fledged state in 1972 after being carved out from Assam.",
          "Cherrapunji and Mawsynram in Meghalaya are among the wettest places on Earth, known for their heavy monsoon rains.",
          "The Khasi, Garo, and Jaintia tribes of Meghalaya traditionally follow a matrilineal system, where lineage and inheritance pass through the mother."
        ],
        "odisha": [
    "The Kalinga War, fought in Odisha in 261 BCE, changed Emperor Ashoka’s heart, leading him to embrace Buddhism and spread its teachings across Asia.",
    "The Konark Sun Temple, a UNESCO World Heritage Site, is designed as a colossal chariot with intricately carved stone wheels, pulled by horses.",
    "Odisha's Jagannath Temple in Puri is famous for its annual Rath Yatra, where massive chariots carry deities through the streets."
  ],

  "punjab": [
    "Punjab was the birthplace of Sikhism and home to the Golden Temple in Amritsar, one of the most spiritually significant sites for Sikhs.",
    "The Jallianwala Bagh Massacre in 1919 was a turning point in India’s freedom struggle, where hundreds of unarmed civilians were killed by British troops.",
    "Punjab was at the heart of the Indus Valley Civilization, with sites like Ropar showing ancient urban settlements."
  ],

  "sikkim": [
    "Sikkim was an independent monarchy until 1975 when it became the 22nd state of India after a referendum.",
    "The state is home to Kangchenjunga, the third-highest mountain in the world, which is revered as a sacred peak by the Sikkimese people.",
    "Buddhism plays a significant role in Sikkim’s culture, and monasteries like Rumtek and Pemayangtse are important religious centers."
  ],

  "telangana": [
    "Telangana was officially formed in 2014, becoming the 29th state of India after separating from Andhra Pradesh.",
    "The Kakatiya dynasty ruled much of present-day Telangana and left behind remarkable architectural marvels like the Ramappa Temple (UNESCO-listed).",
    "Hyderabad, Telangana’s capital, was founded by Muhammad Quli Qutb Shah in 1591 and is famous for its Charminar and Golconda Fort."
  ],

  "tripura": [
    "Tripura was a princely state that merged with India in 1949. It was ruled by the Manikya dynasty for centuries.",
    "The Neermahal (Water Palace), built in the middle of Rudrasagar Lake, is a blend of Hindu and Mughal architectural styles.",
    "Tripura is known for the Unakoti rock carvings, believed to be over 1,000 years old and featuring massive bas-reliefs of Hindu deities."
  ],
  "uttarakhand": [
    "Uttarakhand is home to the Char Dham—Badrinath, Kedarnath, Gangotri, and Yamunotri—some of the most sacred Hindu pilgrimage sites.",
    "The Chipko Movement, one of India’s first environmental movements, began in the 1970s in the forests of Uttarakhand to protest deforestation.",
    "The ancient city of Haridwar is mentioned in Hindu scriptures and is one of the four sites of the Kumbh Mela, held every 12 years."
  ],

  "west bengal": [
    "Kolkata (formerly Calcutta), the capital of West Bengal, was the capital of British India until 1911.",
    "Rabindranath Tagore, the first non-European to win the Nobel Prize in Literature (1913), was born in West Bengal.",
    "The Battle of Plassey in 1757, fought near Murshidabad, marked the beginning of British rule in India."
  ],

  "andaman and nicobar islands": [
    "The Cellular Jail in Port Blair, also known as 'Kala Pani', was used by the British to exile Indian political prisoners during the freedom struggle.",
    "The islands were briefly occupied by the Japanese during World War II, and Subhas Chandra Bose hoisted the Indian national flag here in 1943.",
    "The Andaman tribes, including the Jarawas and Sentinalese, are among the few remaining indigenous peoples still largely untouched by modern civilization."
  ],

  "chandigarh": [
    "Chandigarh was India’s first planned city post-independence, designed by the Swiss-French architect Le Corbusier.",
    "It serves as the capital of both Punjab and Haryana, despite being a Union Territory itself.",
    "The Rock Garden of Chandigarh, created by Nek Chand, is a world-renowned sculpture garden made entirely from industrial & domestic waste."
  ],
  "dadra and nagar haveli and daman and diu": [
    "Dadra and Nagar Haveli was a Portuguese colony until 1954, while Daman and Diu were under Portuguese rule until 1961.",
    "The region is known for its unique blend of Portuguese and Indian cultures, evident in its architecture, cuisine, and festivals.",
    "The Daman Ganga River, which flows through Dadra and Nagar Haveli, is a significant waterway that has shaped the region's history and culture."
  ],
 "ladakh": [
    "Ladakh was part of the princely state of Jammu and Kashmir until 2019 when it was reorganized into a Union Territory.",
    "The region is known for its unique Buddhist culture, with monasteries like Hemis and Thiksey attracting pilgrims and tourists alike.",
    "Ladakh is home to the world’s highest motorable road, the Khardung La, which is a popular destination for adventure enthusiasts."
  ],
  "pondicherry": [
    "Puducherry (formerly Pondicherry) was a French colony until 1954, and its architecture reflects a blend of French and Indian styles.",
    "The Auroville township, founded in 1968, is an experimental community aimed at promoting human unity and sustainable living.",
    "The Sri Aurobindo Ashram, founded by the philosopher and yogi Sri Aurobindo, is a major spiritual center in Puducherry."
  ],
  "lakshadweep": [
    "Lakshadweep is an archipelago of 36 islands, known for its stunning coral reefs and marine biodiversity.",
    "The islands were part of the ancient trade routes and were influenced by various cultures, including Arab, Portuguese, and British.",
    "Lakshadweep is the smallest Union Territory of India, and its economy is primarily based on coconut cultivation and fishing."
  ],

      };
      
      // Default facts for locations not in our database
      const defaultFacts = [
        `${location} has been inhabited by humans for thousands of years, with archaeological evidence suggesting settlements dating back to ancient times.`,
        `During the Industrial Revolution, ${location} saw significant growth and development, becoming an important center for trade and commerce in the region.`,
        `${location} played a crucial role during World War II, with local residents showing remarkable resilience and courage during this challenging period in history.`,
        `The architectural heritage of ${location} reflects various historical periods, from medieval structures to modern buildings, showcasing the area's rich cultural evolution.`,
        `${location} has been the birthplace of several notable historical figures who made significant contributions to science, arts, and politics on the world stage.`,
      ]

      // Try to match the location with our database (case insensitive)
      const locationKey = Object.keys(locationFacts).find((key) => location.toLowerCase().includes(key))

      let factsList = defaultFacts
      if (locationKey) {
        if (locationKey && locationKey in locationFacts) {
          factsList = locationFacts[locationKey as keyof typeof locationFacts]
        }
      }

      const randomFact = factsList[Math.floor(Math.random() * factsList.length)]

      setFact({
        text: randomFact,
        location: location,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch historical facts. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleShare = (platform: string) => {
    if (!fact) return

    const text = `Historical fact about ${fact.location}: ${fact.text}`
    const url = window.location.href

    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=Historical%20Fact&summary=${encodeURIComponent(text)}`
        break
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`
        break
      case "instagram":
        // Instagram doesn't support direct web sharing like other platforms
        // We'll copy the text to clipboard and show instructions
        navigator.clipboard.writeText(text)
        toast({
          title: "Ready for Instagram",
          description: "Text copied to clipboard. Open Instagram and paste in your story or post.",
          duration: 5000,
        })
        return
      default:
        return
    }

    window.open(shareUrl, "_blank")

    toast({
      title: "Shared!",
      description: `Your fact has been shared on ${platform}.`,
    })

    setShowShareOptions(false)
  }

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true)
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // In a real app, you would use a reverse geocoding service
            // For demo purposes, we'll just set a placeholder
            setLocation("Current Location")
            setIsLoading(false)
          } catch (error) {
            toast({
              title: "Error",
              description: "Failed to get your location. Please enter it manually.",
              variant: "destructive",
            })
            setIsLoading(false)
          }
        },
        (error) => {
          toast({
            title: "Geolocation error",
            description: "Unable to access your location. Please enter it manually.",
            variant: "destructive",
          })
          setIsLoading(false)
        },
      )
    } else {
      toast({
        title: "Not supported",
        description: "Geolocation is not supported by your browser. Please enter your location manually.",
        variant: "destructive",
      })
    }
  }

  const selectSuggestion = (suggestion: string) => {
    setLocation(suggestion)
    setShowSuggestions(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            Historical Facts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-2 text-gray-400"
          >
            Discover fascinating history about any location
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card className="bg-gray-900 border-gray-800 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white">Enter a Location</CardTitle>
              <CardDescription className="text-gray-400">
                Type any Indian state to discover its history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input
                      ref={inputRef}
                      placeholder="e.g. J&K, Delhi, Rajasthan"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      onFocus={() => setShowSuggestions(true)}
                      className="pl-10 pr-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600 transition-all duration-300"
                      disabled={isLoading}
                    />
                    {location && (
                      <button
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                        onClick={() => {
                          setLocation("")
                          inputRef.current?.focus()
                        }}
                        disabled={isLoading}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Location suggestions */}
                  <AnimatePresence>
                    {showSuggestions && suggestions.length > 0 && (
                      <motion.div
                        ref={suggestionsRef}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto"
                      >
                        <ul className="py-1">
                          {suggestions.map((suggestion, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05, duration: 0.2 }}
                              onClick={() => selectSuggestion(suggestion)}
                              className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer transition-colors duration-150"
                            >
                              {suggestion}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleGetCurrentLocation}
                  disabled={isLoading}
                  title="Use current location"
                  className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 hover:text-white transition-all duration-300"
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={fetchHistoricalFact}
                className="w-full bg-white text-black hover:bg-gray-200 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Searching...
                  </div>
                ) : (
                  "Discover Historical Facts"
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <AnimatePresence>
          {fact && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gray-900 border-gray-800 shadow-xl overflow-hidden">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="flex justify-between items-center text-white">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      {fact.location}
                    </motion.span>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowShareOptions(!showShareOptions)}
                        className="text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-lg text-gray-200 leading-relaxed"
                  >
                    {fact.text}
                  </motion.p>
                </CardContent>
                <AnimatePresence>
                  {showShareOptions && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardFooter className="flex justify-end space-x-2 pt-4 border-t border-gray-800">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1, duration: 0.3 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleShare("facebook")}
                            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white border-transparent"
                          >
                            <Facebook className="h-4 w-4" />
                          </Button>
                        </motion.div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, duration: 0.3 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleShare("twitter")}
                            className="rounded-full bg-sky-500 hover:bg-sky-600 text-white border-transparent"
                          >
                            <Twitter className="h-4 w-4" />
                          </Button>
                        </motion.div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, duration: 0.3 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleShare("linkedin")}
                            className="rounded-full bg-blue-700 hover:bg-blue-800 text-white border-transparent"
                          >
                            <Linkedin className="h-4 w-4" />
                          </Button>
                        </motion.div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4, duration: 0.3 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleShare("instagram")}
                            className="rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 text-white border-transparent"
                          >
                            <Instagram className="h-4 w-4" />
                          </Button>
                        </motion.div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5, duration: 0.3 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleShare("whatsapp")}
                            className="rounded-full bg-green-500 hover:bg-green-600 text-white border-transparent"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      </CardFooter>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  )
}


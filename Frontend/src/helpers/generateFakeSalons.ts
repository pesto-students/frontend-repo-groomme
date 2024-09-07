const salonNames = [
  "Classic Touch",
  "Royal Roots",
  "Glamour Waves",
  "Elegant Strands",
  "Cut Costs",
  "Hair Artistry",
  "Timeless Cuts",
  "Classic Curls",
  "Urban Locks",
  "Luxe Hair Lounge",
  "Hair Artistry",
  "A La Mode",
  "Sunshine Salon",
  "Salon de Elegance",
  "Butterfly Studio",
  "Salon Paris",
  "Own your Style",
  "Natural Shades",
  "Happy Trimming",
  "Unique style",
];

function generateRandomId(length = 24) {
  const charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charsetLength = charset.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charsetLength);
    result += charset[randomIndex];
  }

  return result;
}
function generateRandomDescription(wordCount: any) {
  const words = [
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
    "ut",
    "enim",
    "ad",
    "minim",
    "veniam",
    "quis",
    "nostrud",
    "exercitation",
    "ullamco",
    "laboris",
    "nisi",
    "ut",
    "aliquip",
    "ex",
    "ea",
    "commodo",
    "consequat",
    "duis",
    "aute",
    "irure",
    "dolor",
    "in",
    "reprehenderit",
    "in",
    "voluptate",
    "velit",
    "esse",
    "cillum",
    "dolore",
    "eu",
    "fugiat",
    "nulla",
    "pariatur",
    "excepteur",
    "sint",
    "occaecat",
    "cupidatat",
    "non",
    "proident",
    "sunt",
    "in",
    "culpa",
    "qui",
    "officia",
    "deserunt",
    "mollit",
    "anim",
    "id",
    "est",
    "laborum",
    "ut",
    "aliquam",
    "cupiditate",
    "voluptatem",
    "maiores",
    "repudiandae",
    "nostrum",
    "quod",
    "eaque",
    "possimus",
    "voluptatum",
    "reprehenderit",
    "sapiente",
    "error",
    "nam",
    "ex",
    "dicta",
    "vel",
    "consectetur",
    "delectus",
    "voluptas",
    "eligendi",
    "ipsam",
    "dolorem",
    "incidunt",
    "accusantium",
    "aut",
    "quasi",
    "enim",
    "libero",
    "dolore",
    "explicabo",
    "velit",
    "impedit",
    "repellendus",
    "harum",
    "iure",
    "assumenda",
    "reprehenderit",
    "blanditiis",
    "sit",
    "aspernatur",
    "optio",
    "mollitia",
    "iusto",
    "non",
    "reprehenderit",
    "voluptatibus",
    "sint",
    "maxime",
    "dolor",
    "occaecati",
    "eos",
    "voluptatem",
    "qui",
    "exercitationem",
    "beatae",
    "minus",
    "numquam",
    "in",
    "eiusmod",
    "tempor",
    "cupiditate",
    "expedita",
    "pariatur",
    "repudiandae",
    "fugiat",
    "consectetur",
    "consectetur",
    "placeat",
    "asperiores",
    "necessitatibus",
    "provident",
    "laboriosam",
    "quis",
    "aliquid",
    "inventore",
    "voluptatum",
    "cumque",
    "praesentium",
    "id",
    "adipisci",
    "qui",
    "iure",
    "nobis",
    "nemo",
    "ratione",
    "fugit",
    "quod",
    "repellat",
    "maiores",
    "facere",
    "eveniet",
    "facilis",
    "consequatur",
    "doloremque",
    "accusamus",
    "voluptates",
    "autem",
    "impedit",
    "eius",
    "laborum",
    "delectus",
    "deserunt",
    "tempore",
    "ad",
    "voluptatibus",
    "eum",
    "doloribus",
    "sint",
    "aperiam",
    "magni",
    "qui",
    "optio",
    "animi",
    "enim",
    "tempora",
    "dolorem",
    "dolorem",
    "quibusdam",
    "est",
    "iusto",
    "quod",
    "beatae",
    "quasi",
    "maiores",
    "soluta",
    "officia",
    "reprehenderit",
    "dolor",
    "dolorem",
    "explicabo",
    "dignissimos",
    "aut",
    "explicabo",
    "vel",
    "sequi",
    "est",
    "cum",
    "libero",
    "dolorum",
    "voluptatem",
  ];

  let description = "";

  for (let i = 0; i < wordCount; i++) {
    // Randomly pick a word from the list
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
    description += word + " ";

    // Add a period or comma occasionally for better readability
    if (Math.random() < 0.05) {
      description += Math.random() < 0.5 ? ". " : ", ";
    }
  }

  // Capitalize the first letter of the description
  description = description.charAt(0).toUpperCase() + description.slice(1);

  return description.trim();
}

const serviceNames = [
  "Haircut",
  "Hair Coloring",
  "Hair Styling",
  "Hair Extensions",
  "Hair Treatments",
  "Manicure",
  "Pedicure",
  "Nail Art",
  "Facial",
  "Waxing",
  "Eyebrow Shaping",
  "Eyelash Extensions",
  "Massage",
  "Body Scrub",
  "Bridal Makeup",
  "Special Occasion Makeup",
  "Permanent Makeup",
  "Skincare Treatments",
  "Men's Grooming",
  "Beard Trimming",
];

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const serviceCategories = [
  "Haircuts & Styling",
  "Coloring",
  "Hair Treatments",
  "Texturizing",
  "Extensions & Wigs",
  "Bridal Services",
  "Makeup",
  "Nail Care",
  "Waxing",
  "Facials",
  "Massage Therapy",
  "Body Treatments",
  "Men's Grooming",
  "Children's Services",
  "Spa Packages",
  "Hair & Scalp Analysis",
  "Tattoo & Piercing",
  "Eyelash & Eyebrow Services",
  "Specialty Services",
  "Personalized Consultations",
];

function generateFakeName() {
  const firstNames = [
    "John",
    "Jane",
    "Alex",
    "Emily",
    "Michael",
    "Sarah",
    "David",
    "Laura",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Jones",
    "Brown",
    "Davis",
    "Miller",
    "Wilson",
  ];

  const randomFirstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${randomFirstName} ${randomLastName}`;
}
const barberSpecialties = [
  "Hairstyling",
  "Makeup Artistry",
  "Coloring",
  "Shaving",
  "Beard Grooming",
  "Hair Cutting",
  "Scalp Treatments",
  "Hair Texturizing",
  "Hair Straightening",
  "Perming",
  "Highlights",
  "Low Lights",
  "Hair Extensions",
  "Balding Solutions",
  "Men's Haircuts",
  "Children's Haircuts",
  "Facial Hair Trimming",
  "Hair Restoration",
  "Wigs and Toppers",
  "Hair Conditioning Treatments",
  "Keratin Treatments",
  "Updos",
  "Braiding",
  "Hair Detox",
  "Hair Smoothing",
  "Temporary Hair Color",
  "Hair Relaxing",
  "Hair Rebonding",
  "Hair Care Counseling",
  "Eyebrow Shaping",
  "Eyebrow Tinting",
  "Nail Grooming",
  "Threading",
  "Ear Piercing",
  "Men's Grooming Packages",
  "Special Occasion Hairstyles",
  "Hair Cutting for Events",
  "Scalp Massage",
  "Hair Color Correction",
  "Texturizing Scissors Techniques",
  "Hair Health Analysis",
  "Custom Haircuts",
  "Vintage Haircuts",
  "Contemporary Haircuts",
  "Celebrity Style Cuts",
  "Precision Cutting",
  "Edgy Haircuts",
  "Classic Cuts",
  "Trendy Styles",
  "Seasonal Hair Trends",
];
function generateRandomCoordinates() {
  // Generate a random latitude between -90 and 90
  const latitude = (Math.random() * 180 - 90).toFixed(6);

  // Generate a random longitude between -180 and 180
  const longitude = (Math.random() * 360 - 180).toFixed(6);

  return { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
}
function generateRandomAddress() {
  const streets = [
    "45 Connaught Place",
    "12 Main Street",
    "56 Oak Avenue",
    "78 Elm Road",
    "90 Maple Drive",
  ];

  const cities = ["Delhi", "Mumbai", "Kolkata", "Bangalore", "Chennai"];

  const states = [
    "Delhi",
    "Maharashtra",
    "West Bengal",
    "Karnataka",
    "Tamil Nadu",
  ];

  const postalCodes = ["110001", "400001", "700001", "560001", "600001"];

  const countries = ["India"];

  return {
    address: {
      street: streets[Math.floor(Math.random() * streets.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      state: states[Math.floor(Math.random() * states.length)],
      postalCode: postalCodes[Math.floor(Math.random() * postalCodes.length)],
      country: countries[0],
    },
  };
}

export function generateRandomSalon() {
  const salonName = salonNames[Math.floor(Math.random() * salonNames.length)];
  const description = generateRandomDescription(1500);
  const services = Array.from({ length: 6 }, () => ({
    name: serviceNames[Math.floor(Math.random() * serviceNames.length)],
    description: generateRandomDescription(10),
    rate: getRandomNumber(1000, 10000),
    category:
      serviceCategories[Math.floor(Math.random() * serviceCategories.length)],
  }));
  const mapLocationLink = `https://maps.app.goo.gl/example${Math.floor(
    Math.random() * 10
  )}`;
  const staff = Array.from({ length: 4 }, () => ({
    fullname: generateFakeName(),
    description: generateRandomDescription(15),
    specialties: Array.from(
      { length: 4 },
      () =>
        barberSpecialties[Math.floor(Math.random() * barberSpecialties.length)]
    ),
    profilePic: `https://example.com/${generateRandomId()}.jpg`,
  }));
  const salonImages = Array.from({ length: 7 }, () => ({
    url: `https://example.com/${generateRandomId()}.jpg`,
  }));
  const coordinates = generateRandomCoordinates();
  const address = generateRandomAddress().address;

  return {
    userId: generateRandomId(24),
    salonName,
    description,
    services,
    mapLocationLink,
    staff,
    salonImages,
    coordinates,
    slotGeneration: {
      slotInterval: getRandomNumber(10, 30),
      openingClosingHours: {
        monday: {
          opening: getRandomNumber(800, 1000),
          closing: getRandomNumber(1600, 2000),
        },
        tuesday: {
          opening: getRandomNumber(800, 1000),
          closing: getRandomNumber(1600, 2000),
        },
        wednesday: {
          opening: getRandomNumber(800, 1000),
          closing: getRandomNumber(1600, 2000),
        },
        thursday: {
          opening: getRandomNumber(800, 1000),
          closing: getRandomNumber(1600, 2000),
        },
        friday: {
          opening: getRandomNumber(800, 1000),
          closing: getRandomNumber(1600, 2000),
        },
        saturday: {
          opening: getRandomNumber(800, 1000),
          closing: getRandomNumber(1600, 2000),
        },
        sunday: {
          opening: getRandomNumber(800, 1000),
          closing: getRandomNumber(1600, 2000),
        },
      },
    },
    address,
  };
}

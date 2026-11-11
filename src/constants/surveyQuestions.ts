export interface SurveyQuestion {
  id: string;
  question: string;
  options: string[];
}

export interface SurveySection {
  sectionId: string;
  sectionTitle: string;
  description: string;
  questions: SurveyQuestion[];
}

export const SURVEY_QUESTIONS: SurveySection[] = [
  {
    sectionId: 'section1',
    sectionTitle: '1. Household Details',
    description: 'Basic demographic and family profile in Kuntamukkala Village.',
    questions: [
      {
        id: 'q1_family_size',
        question: 'What is your total family size?',
        options: ['1-2 members', '3-4 members', '5-6 members', 'More than 6 members'],
      },
      {
        id: 'q2_children_count',
        question: 'How many school-going children reside in your household?',
        options: ['None', '1 child', '2 children', '3 or more children'],
      },
      {
        id: 'q3_locality',
        question: 'Which area or locality of Kuntamukkala Village do you reside in?',
        options: [
          'Sub-station Road Area',
          'Panchayat Office Center',
          'BC Colony',
          'Harijan Vada / SC Colony',
          'Cheruvu Bund Street',
          'Main Road Area',
        ],
      },
      {
        id: 'q4_residence_years',
        question: 'How long has your family lived in Kuntamukkala Village?',
        options: ['Less than 5 years', '5-10 years', '10-20 years', '20+ years / Native resident'],
      },
    ],
  },
  {
    sectionId: 'section2',
    sectionTitle: '2. Education and Accessibility',
    description: 'Evaluating school distance, travel conditions, and school infrastructure.',
    questions: [
      {
        id: 'q5_school_dist',
        question: 'How far do school children travel from home to their primary/secondary school?',
        options: [
          'Less than 0.5 km',
          'Approx. 0.5 - 1 km',
          '1 km - 2 km',
          'More than 2 km (Outside village)',
        ],
      },
      {
        id: 'q6_travel_mode',
        question: 'How do children generally travel to school daily?',
        options: ['Walking / On foot', 'Bicycle', 'Auto / Shared transit', 'Parent two-wheeler drop'],
      },
      {
        id: 'q7_rainy_difficulty',
        question: 'Are transportation and road travel difficulties greater during the monsoon rainy season?',
        options: [
          'Severe difficulty (Muddy, flooded unpaved paths)',
          'Moderate difficulty (Slow travel)',
          'Minor inconvenience',
          'No difficulty (Concrete roads present)',
        ],
      },
      {
        id: 'q8_classroom_space',
        question: 'Are local classroom facilities and space sufficient for all student grades?',
        options: [
          'Insufficient space & combined classes',
          'Moderately sufficient',
          'Well equipped & spacious',
          "No opinion / Don't know",
        ],
      },
      {
        id: 'q9_transport_need',
        question: 'Is improved school transit or gravel road surfacing urgently required for rainy season travel?',
        options: [
          'High priority urgent need',
          'Medium priority',
          'Low priority',
          'Not needed',
        ],
      },
    ],
  },
  {
    sectionId: 'section3',
    sectionTitle: '3. Occupation and Livelihood',
    description: 'Assessing primary household income sources and employment.',
    questions: [
      {
        id: 'q10_primary_occ',
        question: 'What is the primary occupation of the main earner in your household?',
        options: [
          'Agriculture / Farming',
          'Agricultural Labour',
          'Small Business / Shopkeeper',
          'Private Employment',
          'Government Job / Pensioner',
          'Daily Wage Worker',
        ],
      },
      {
        id: 'q11_income_range',
        question: 'What is your approximate monthly household income bracket?',
        options: ['Below ₹8,000', '₹8,000 - ₹15,000', '₹15,000 - ₹25,000', 'Above ₹25,000'],
      },
    ],
  },
  {
    sectionId: 'section4',
    sectionTitle: '4. Housing and Basic Facilities',
    description: 'Housing structure types and drinking water accessibility.',
    questions: [
      {
        id: 'q12_house_type',
        question: 'What type of housing structure do you reside in?',
        options: ['Pucca (Concrete/Slab)', 'Semi-Pucca (Tiled roof/Brick)', 'Kutcha (Thatch/Sheet)'],
      },
      {
        id: 'q13_water_source',
        question: 'What is your primary source of drinking water?',
        options: [
          'Gram Panchayat Tap Connection',
          'Community Borewell / Handpump',
          'RO Mineral Water Plant',
          'Open Well',
        ],
      },
      {
        id: 'q14_toilet_facility',
        question: 'Does your household have a functional Individual Household Latrine (IHHL)?',
        options: [
          'Yes, fully functional latrine',
          'Yes, but requires maintenance',
          'No, use community/shared facility',
          'No latrine facility',
        ],
      },
    ],
  },
  {
    sectionId: 'section5',
    sectionTitle: '5. Drainage and Environmental Cleanliness',
    description: 'Assessing street drain infrastructure, stagnant water, and mosquito breeding.',
    questions: [
      {
        id: 'q15_drainage_type',
        question: 'What type of drainage system exists in your immediate street/locality?',
        options: [
          'Covered Concrete Drains',
          'Open Concrete Drains',
          'Kutcha / Earthen Drains',
          'No Drainage System at all',
        ],
      },
      {
        id: 'q16_drain_cleaning_freq',
        question: 'How frequently are street drains cleaned by the sanitation staff?',
        options: [
          'Weekly once',
          'Fortnightly (Every 15 days)',
          'Irregularly / Monthly',
          'Rarely / Never cleaned',
        ],
      },
      {
        id: 'q17_stagnant_water',
        question: 'Do you notice stagnant rainwater accumulation near your residence after downpours?',
        options: [
          'Yes, severe waterlogging for days',
          'Yes, temporary pooling for a few hours',
          'Rarely',
          'Never',
        ],
      },
      {
        id: 'q18_mosquito_threat',
        question: 'Are mosquitoes and vector-borne health concerns a major issue in your area?',
        options: [
          'Very high mosquito concern',
          'Moderate concern',
          'Low concern',
          'Not a concern',
        ],
      },
      {
        id: 'q19_waste_disposal',
        question: 'How is household garbage generally collected and disposed of?',
        options: [
          'Gram Panchayat Collection Tractor/Cart',
          'Disposed in open community dump',
          'Disposed in private compost/pit',
          'Burned in open backyard',
        ],
      },
    ],
  },
  {
    sectionId: 'section6',
    sectionTitle: '6. Community Suggestions',
    description: 'Resident recommendations for village development and Panchayat priorities.',
    questions: [
      {
        id: 'q20_top_priority',
        question: 'What should be the single highest priority action item for Kuntamukkala Gram Panchayat?',
        options: [
          'Concrete covered drainage construction & desilting',
          'School pathway leveling & rainy season transit',
          'Regular waste collection & covered dustbins',
          'Anti-mosquito fogging & water stagnation removal',
          'Street lighting & drinking water purity',
        ],
      },
      {
        id: 'q21_school_suggestion',
        question: 'What key improvement is most needed for local school children?',
        options: [
          'All-weather cement / metalled road to school',
          'Additional classroom construction & desks',
          'Dedicated school auto/bus service during rains',
          'Better drinking water & toilet sanitation at school',
        ],
      },
      {
        id: 'q22_panchayat_rating',
        question: 'How would you rate the responsiveness of community problem resolution in Kuntamukkala?',
        options: ['Very Good / Prompt', 'Satisfactory', 'Needs Improvement', 'Unsatisfactory'],
      },
    ],
  },
];

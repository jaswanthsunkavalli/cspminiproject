import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Complaint from './models/Complaint.js';
import AwarenessPost from './models/AwarenessPost.js';
import SurveyResponse from './models/SurveyResponse.js';
import ActivityLog from './models/ActivityLog.js';

export const seedDatabase = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Database already seeded. Skipping initial seed.');
      return;
    }

    console.log('Seeding initial demonstration data for Kuntamukkala Connect...');

    // Hash passwords
    const adminPasswordHash = await bcrypt.hash('admin123', 10);
    const volunteerPasswordHash = await bcrypt.hash('volunteer123', 10);
    const residentPasswordHash = await bcrypt.hash('resident123', 10);

    // Create Users
    const admin = await User.create({
      name: 'Panchayat Admin (Kuntamukkala)',
      email: 'admin@kuntamukkala.gov.in',
      phone: '9848012345',
      passwordHash: adminPasswordHash,
      role: 'admin',
    });

    const volunteer = await User.create({
      name: 'Suresh Kumar (Field Volunteer)',
      email: 'volunteer@kuntamukkala.gov.in',
      phone: '9848054321',
      passwordHash: volunteerPasswordHash,
      role: 'volunteer',
    });

    const resident1 = await User.create({
      name: 'Ramesh Varma',
      email: 'resident@kuntamukkala.gov.in',
      phone: '9848099887',
      passwordHash: residentPasswordHash,
      role: 'resident',
    });

    const resident2 = await User.create({
      name: 'Lakshmi Devi',
      email: 'lakshmi.d@gmail.com',
      phone: '9848011223',
      passwordHash: residentPasswordHash,
      role: 'resident',
    });

    const resident3 = await User.create({
      name: 'Venkateswara Rao',
      email: 'venkat.k@gmail.com',
      phone: '9848033445',
      passwordHash: residentPasswordHash,
      role: 'resident',
    });

    // Create Complaints
    const complaintsData = [
      {
        complaintId: 'KNT-2026-0001',
        title: 'School Route Inaccessible During Monsoon Rains',
        description:
          'Children travelling approximately 1 km to the primary school face severe mud and waterlogging on the unpaved stretch near the Sub-station road during monsoon downpours.',
        category: 'Educational Accessibility',
        subcategory: 'Rainy-season travel difficulty',
        priority: 'High',
        status: 'Pending',
        location: 'Sub-station Road to Primary School Stretch',
        images: ['https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80'],
        reporter: resident1._id,
        responsibleDepartment: 'Education & Rural Roads Infrastructure',
        remarks: 'Report received. Inspection team scheduled for road metal leveling.',
        statusHistory: [
          {
            status: 'Pending',
            remarks: 'Complaint registered by resident.',
            updatedBy: resident1._id,
            updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          },
        ],
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        complaintId: 'KNT-2026-0002',
        title: 'Blocked Drainage & Overflow Near Panchayat Office Center',
        description:
          'Main open street drain is choked with plastic waste and silt, causing dirty drain water to overflow onto the road near the Panchayat Office intersection.',
        category: 'Environmental Cleanliness',
        subcategory: 'Blocked drainage',
        priority: 'High',
        status: 'In Progress',
        location: 'Panchayat Office Center Street',
        images: ['https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=800&q=80'],
        reporter: resident2._id,
        assignedTo: volunteer._id,
        responsibleDepartment: 'Gram Panchayat Sanitation Team',
        remarks: 'Sanitation workers deployed for manual desilting and drain clearance.',
        statusHistory: [
          {
            status: 'Pending',
            remarks: 'Submitted by resident.',
            updatedBy: resident2._id,
            updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          },
          {
            status: 'In Progress',
            remarks: 'Assigned to sanitation squad with desilting equipment.',
            updatedBy: admin._id,
            updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          },
        ],
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        complaintId: 'KNT-2026-0003',
        title: 'Insufficient Classroom Facilities at Mandal Parishad Primary School',
        description:
          'Parents report overcrowding in primary classrooms where two grades are seated together due to structural maintenance in building wing B.',
        category: 'Educational Accessibility',
        subcategory: 'Classroom infrastructure',
        priority: 'Medium',
        status: 'In Progress',
        location: 'MPPS School Campus, Main Road',
        images: [],
        reporter: resident3._id,
        assignedTo: 'Mandal Education Officer (MEO)',
        responsibleDepartment: 'School Education Department',
        remarks: 'Submitted representation to MEO G. Konduru for temporary partition screens.',
        statusHistory: [
          {
            status: 'Pending',
            remarks: 'Reported by parent committee member.',
            updatedBy: resident3._id,
            updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
          {
            status: 'In Progress',
            remarks: 'Joint site visit conducted by Volunteer and School Committee.',
            updatedBy: volunteer._id,
            updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          },
        ],
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
      {
        complaintId: 'KNT-2026-0004',
        title: 'Stagnant Water Pool creating Mosquito Menace near BC Colony',
        description:
          'Rainwater accumulation in low-lying open plot near Street 4 has resulted in heavy mosquito breeding, heightening viral fever concerns among residents.',
        category: 'Environmental Cleanliness',
        subcategory: 'Mosquito problems',
        priority: 'High',
        status: 'Pending',
        location: 'BC Colony Street 4 Open Plot',
        images: [],
        reporter: resident1._id,
        responsibleDepartment: 'Health & Vector Control Division',
        remarks: 'Anti-larval oil spray and fogging requested.',
        statusHistory: [
          {
            status: 'Pending',
            remarks: 'Report registered.',
            updatedBy: resident1._id,
            updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          },
        ],
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        complaintId: 'KNT-2026-0005',
        title: 'Need Regular Garbage Collection & Covered Bins near Cheruvu Bund',
        description:
          'Household waste is dumped openly near the lake bund due to missing community bins, causing foul smell and stray animal nuisance.',
        category: 'Environmental Cleanliness',
        subcategory: 'Waste disposal',
        priority: 'Medium',
        status: 'Resolved',
        location: 'Cheruvu Bund Road Entrance',
        images: [],
        reporter: resident2._id,
        assignedTo: admin._id,
        responsibleDepartment: 'Gram Panchayat Sanitation Team',
        remarks: '2 new covered green/blue dustbins installed. Daily morning auto tractor collection scheduled.',
        statusHistory: [
          {
            status: 'Pending',
            remarks: 'Complaint filed.',
            updatedBy: resident2._id,
            updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          },
          {
            status: 'In Progress',
            remarks: 'Bins procured from Mandal Panchayat quota.',
            updatedBy: admin._id,
            updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          },
          {
            status: 'Resolved',
            remarks: 'Dustbins fixed on concrete platforms and waste vehicle route updated.',
            updatedBy: admin._id,
            updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          },
        ],
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      },
    ];

    await Complaint.insertMany(complaintsData);

    // Seed Awareness Posts
    const awarenessData = [
      {
        title: 'Safe School Travel Framework During Rainy Season',
        category: 'Educational Accessibility',
        description: 'Guidelines for children and parents navigating unpaved roads and monsoon travel safety in Kuntamukkala.',
        content:
          'During peak monsoon months, travelling ~1 km to school poses challenges. We urge parents to use designated gravel pathways, avoid waterlogged open ditches, and report slushy sections immediately on Kuntamukkala Connect for priority Gram Panchayat gravel filling.',
        author: admin._id,
        authorName: 'Gram Panchayat Education Cell',
        isPublished: true,
        publishedAt: new Date(),
      },
      {
        title: 'Preventing Mosquito Breeding: Clean Drain & Anti-Stagnation Action',
        category: 'Environmental Cleanliness',
        description: 'Community steps to eliminate stagnant water pockets and keep household surroundings dry.',
        content:
          'Mosquito-borne illnesses thrive in stagnant rainwater. Ensure discarded coconut shells, old tyres, and flowerpot trays do not retain water for more than 3 days. Report stagnant pools in your street for prompt Panchayat anti-larval spraying.',
        author: admin._id,
        authorName: 'Kuntamukkala Health & Vector Control',
        isPublished: true,
        publishedAt: new Date(),
      },
      {
        title: 'Source Segregation & Responsible Garbage Disposal',
        category: 'Environmental Cleanliness',
        description: 'How to separate wet and dry waste to prevent drain blockages in Kuntamukkala Village.',
        content:
          'Plastics dumped into open street drains cause severe overflow during rains. Please segregate organic kitchen waste from non-biodegradable plastics and hand over dry waste to the Gram Panchayat sanitation cart.',
        author: admin._id,
        authorName: 'Gram Panchayat Sanitation Team',
        isPublished: true,
        publishedAt: new Date(),
      },
    ];

    await AwarenessPost.insertMany(awarenessData);

    // Seed sample survey aggregate responses
    const sampleSurveys = [
      {
        respondent: resident1._id,
        isAnonymous: false,
        section1: { q1_family_size: '4-5 members', q2_children_count: '2 children', q3_locality: 'Sub-station Area', q4_residence_years: '10+ years' },
        section2: { q5_school_dist: '0.5 - 1 km', q6_travel_mode: 'On foot / Walking', q7_rainy_difficulty: 'Severe difficulty due to mud', q8_classroom_space: 'Needs improvement', q9_transport_need: 'High priority' },
        section3: { q10_primary_occ: 'Agriculture / Farming', q11_income_range: '₹10,000 - ₹20,000 / month' },
        section4: { q12_house_type: 'Pucca House', q13_water_source: 'Panchayat Tap Water', q14_toilet_facility: 'Individual Household Latrine (IHHL)' },
        section5: { q15_drainage_type: 'Open Kutcha Drains', q16_drain_cleaning_freq: 'Irregular / Monthly', q17_stagnant_water: 'Noticed frequently after rain', q18_mosquito_threat: 'Very high', q19_waste_disposal: 'Open pit / Burning' },
        section6: { q20_top_priority: 'Drain cleaning & concrete side drains', q21_school_suggestion: 'Provide gravel road surfacing for school path', q22_panchayat_rating: 'Satisfactory, needs faster action' },
      },
      {
        respondent: resident2._id,
        isAnonymous: true,
        section1: { q1_family_size: '3 members', q2_children_count: '1 child', q3_locality: 'Panchayat Office Center', q4_residence_years: '15+ years' },
        section2: { q5_school_dist: '1 km', q6_travel_mode: 'Bicycle', q7_rainy_difficulty: 'Moderate difficulty', q8_classroom_space: 'Adequate', q9_transport_need: 'Medium priority' },
        section3: { q10_primary_occ: 'Small Business / Shopkeeping', q11_income_range: '₹15,000 - ₹25,000 / month' },
        section4: { q12_house_type: 'Pucca House', q13_water_source: 'Borewell / Community Tap', q14_toilet_facility: 'Individual Household Latrine (IHHL)' },
        section5: { q15_drainage_type: 'Open Pucca Drains', q16_drain_cleaning_freq: 'Weekly once', q17_stagnant_water: 'Occasional near street ends', q18_mosquito_threat: 'Moderate', q19_waste_disposal: 'Panchayat Collection Cart' },
        section6: { q20_top_priority: 'Regular dustbin pickup', q21_school_suggestion: 'Better drinking water facilities in school', q22_panchayat_rating: 'Good' },
      },
    ];

    await SurveyResponse.insertMany(sampleSurveys);

    // Activity Log entry
    await ActivityLog.create({
      user: admin._id,
      userName: admin.name,
      userRole: admin.role,
      action: 'INITIAL_SYSTEM_SEED',
      resourceType: 'System',
      newValue: 'Seeded 5 complaints, 3 awareness posts, 2 survey records, and 5 users.',
    });

    console.log('Successfully seeded database with demonstration records.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

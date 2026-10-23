export const LOCATIONS = [
  {
    id: 'ues',
    name: 'Upper East Side',
    neighborhood: 'Yorkville / Upper East Side',
    address: '1724 2nd Avenue',
    cityStateZip: 'New York, NY 10128',
    crossStreet: 'Between 89th & 90th Street',
    phone: '212-722-6262',
    phoneRaw: '+12127226262',
    fax: '212-722-6161',
    googleMapsUrl: 'https://maps.google.com/?q=Mughlai+Indian+Cuisine+1724+2nd+Ave+New+York+NY+10128',
    deliveryCoverage: 'Yorkville, Lenox Hill, Carnegie Hill, Upper East Side (E 70th to 96th St)',
    highlights: 'Classic uptown dining room, fast delivery across the Upper East Side, tandoori oven on site.',
    hours: {
      lunch: 'Mon – Sun: 11:00 AM – 2:45 PM',
      dinner: {
        weekday: 'Mon – Fri: 5:00 PM – 10:15 PM',
        saturday: 'Sat: 3:00 PM – 10:15 PM',
        sunday: 'Sun: 3:00 PM – 9:45 PM',
      }
    },
    features: ['Dine-In Seating', 'Hot Takeout', 'Fast Delivery', 'Full Catering', '100% Halal Meat'],
    orderUrl: '/menu',
  },
  {
    id: 'kips-bay',
    name: 'Kips Bay',
    neighborhood: 'Gramercy / Kips Bay',
    address: '329 3rd Avenue',
    cityStateZip: 'New York, NY 10010',
    crossStreet: 'Between 24th & 25th Street',
    phone: '212-889-0909',
    phoneRaw: '+12128890909',
    fax: '212-889-3939',
    googleMapsUrl: 'https://maps.google.com/?q=Mughlai+Indian+Cuisine+329+3rd+Ave+New+York+NY+10010',
    deliveryCoverage: 'Gramercy Park, Murray Hill, Flatiron, Stuyvesant Town, Kips Bay (E 14th to 38th St)',
    highlights: 'Bustling Third Avenue kitchen serving Gramercy, Baruch college area, and residential towers.',
    hours: {
      lunch: 'Mon – Sun: 11:00 AM – 2:45 PM',
      dinner: {
        weekday: 'Mon – Fri: 5:00 PM – 10:15 PM',
        saturday: 'Sat: 3:00 PM – 10:15 PM',
        sunday: 'Sun: 3:00 PM – 9:45 PM',
      }
    },
    features: ['Dine-In Seating', 'Hot Takeout', 'Fast Delivery', 'Corporate Lunches', '100% Halal Meat'],
    orderUrl: '/menu',
  },
  {
    id: 'hells-kitchen',
    name: "Hell's Kitchen",
    neighborhood: 'Midtown West / Theater District',
    address: '255 West 55th Street',
    cityStateZip: 'New York, NY 10019',
    crossStreet: 'Between 8th Avenue & Broadway',
    phone: '646-870-0555',
    phoneRaw: '+16468700555',
    fax: '646-870-0535',
    googleMapsUrl: 'https://maps.google.com/?q=Mughlai+Indian+Cuisine+255+W+55th+St+New+York+NY+10019',
    deliveryCoverage: 'Theater District, Midtown West, Times Square, Columbus Circle, Clinton (W 42nd to 59th St)',
    highlights: 'Steps from Broadway theaters & Central Park South. Pre-theater dinner & late-night dining.',
    hours: {
      lunch: 'Mon – Sun: 11:00 AM – 2:45 PM',
      dinner: {
        weekday: 'Mon – Fri: 5:00 PM – 10:15 PM',
        saturday: 'Sat: 3:00 PM – 10:15 PM',
        sunday: 'Sun: 3:00 PM – 9:45 PM',
      }
    },
    features: ['Pre-Theater Dining', 'Dine-In', 'Takeout', 'Late Delivery', '100% Halal Meat'],
    orderUrl: '/menu',
  },
  {
    id: 'fidi',
    name: 'Financial District',
    neighborhood: 'Downtown / Wall Street',
    address: '120 Cedar Street',
    cityStateZip: 'New York, NY 10006',
    crossStreet: 'Corner of Cedar & Greenwich St',
    phone: '646-398-8985',
    phoneRaw: '+16463988985',
    fax: '646-398-8396',
    googleMapsUrl: 'https://maps.google.com/?q=Mughlai+Indian+Cuisine+120+Cedar+St+New+York+NY+10006',
    deliveryCoverage: 'Wall Street, Battery Park City, Tribeca, Fulton, Seaport, World Trade Center',
    highlights: 'Corner location opposite WTC, popular for executive catering, corporate lunch & dinner takeout.',
    hours: {
      lunch: 'Mon – Sun: 11:00 AM – 2:45 PM',
      dinner: {
        weekday: 'Mon – Fri: 5:00 PM – 10:15 PM',
        saturday: 'Sat: 3:00 PM – 10:15 PM',
        sunday: 'Sun: 3:00 PM – 9:45 PM',
      }
    },
    features: ['Corporate Catering', 'Executive Lunches', 'Takeout', 'Delivery', '100% Halal Meat'],
    orderUrl: '/menu',
  },
  {
    id: 'uws',
    name: 'Upper West Side',
    neighborhood: 'Upper West Side / Central Park West',
    address: '489 Columbus Avenue',
    cityStateZip: 'New York, NY 10024',
    crossStreet: 'Between 83rd & 84th Street',
    phone: '646-869-0300',
    phoneRaw: '+16468690300',
    fax: '646-869-0331',
    googleMapsUrl: 'https://maps.google.com/?q=Mughlai+Indian+Cuisine+489+Columbus+Ave+New+York+NY+10024',
    deliveryCoverage: 'Lincoln Square, Upper West Side, Manhattan Valley, Central Park West (W 60th to 96th St)',
    highlights: 'Historic Columbus Avenue dining, near American Museum of Natural History & Central Park.',
    hours: {
      lunch: 'Mon – Sun: 11:00 AM – 2:45 PM',
      dinner: {
        weekday: 'Mon – Fri: 5:00 PM – 10:15 PM',
        saturday: 'Sat: 3:00 PM – 10:15 PM',
        sunday: 'Sun: 3:00 PM – 9:45 PM',
      }
    },
    features: ['Family Friendly', 'Dine-In', 'Takeout', 'Park Picnics Delivery', '100% Halal Meat'],
    orderUrl: '/menu',
  }
];

export function getBranchStatus() {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });
    const parts = formatter.formatToParts(now);
    const day = parts.find(p => p.type === 'weekday')?.value || 'Mon';
    const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '12', 10);
    const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);
    const timeVal = hour + minute / 60;
    
    const isSaturday = day === 'Sat';
    const isSunday = day === 'Sun';

    // Lunch across all 7 days: 11:00 AM - 2:45 PM
    if (timeVal >= 11.0 && timeVal <= 14.75) {
      return { isOpen: true, session: 'Lunch', text: 'Open Now for Lunch (till 2:45 PM)' };
    }

    if (timeVal < 11.0) {
      return { isOpen: false, session: 'Lunch', text: 'Opens at 11:00 AM for Lunch' };
    }

    // Weekend (Sat & Sun): Dinner starts at 3:00 PM
    if (isSaturday) {
      if (timeVal > 14.75 && timeVal < 15.0) {
        return { isOpen: false, session: 'Dinner', text: 'Kitchen Reopens at 3:00 PM for Dinner' };
      }
      if (timeVal >= 15.0 && timeVal <= 22.25) {
        return { isOpen: true, session: 'Dinner', text: 'Open Now for Dinner (till 10:15 PM)' };
      }
      return { isOpen: false, session: 'Closed', text: 'Closed for Night • Opens 11:00 AM' };
    }

    if (isSunday) {
      if (timeVal > 14.75 && timeVal < 15.0) {
        return { isOpen: false, session: 'Dinner', text: 'Kitchen Reopens at 3:00 PM for Dinner' };
      }
      if (timeVal >= 15.0 && timeVal <= 21.75) {
        return { isOpen: true, session: 'Dinner', text: 'Open Now for Dinner (till 9:45 PM)' };
      }
      return { isOpen: false, session: 'Closed', text: 'Closed for Night • Opens 11:00 AM' };
    }

    // Weekdays (Mon - Fri): Dinner 5:00 PM - 10:15 PM
    if (timeVal > 14.75 && timeVal < 17.0) {
      return { isOpen: false, session: 'Dinner', text: 'Kitchen Reopens at 5:00 PM for Dinner' };
    }
    if (timeVal >= 17.0 && timeVal <= 22.25) {
      return { isOpen: true, session: 'Dinner', text: 'Open Now for Dinner (till 10:15 PM)' };
    }
    return { isOpen: false, session: 'Closed', text: 'Closed for Night • Opens 11:00 AM' };
  } catch {
    return { isOpen: true, session: 'Open', text: 'Open Daily for Lunch & Dinner' };
  }
}

export const BRAND_INFO = {
  name: 'Mughlai Indian Cuisine',
  tagline: 'The Golden Taste of India',
  phone: '212-722-6262',
  deal: {
    title: 'Mughlai Delivery & Take Out Special',
    price: '$22.95',
    includes: '1 Appetizer, 1 Entrée, Basmati Rice, Naan, Mango Chutney & Cucumber Raita'
  },
  halalStatement: 'We Proudly Serve 100% Certified Halal Meat Across All 5 Manhattan Kitchens',
  email: 'MughlaiCuisineNY@gmail.com',
  website: 'www.MughlaiCuisineNY.com',
};

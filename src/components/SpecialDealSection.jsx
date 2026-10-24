import React, { useState, useRef, useEffect } from 'react';
import { 
  Flame, 
  Check, 
  ShieldCheck, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Layers,
  ChefHat
} from 'lucide-react';
import { preventOrphans } from '../utils/textUtils';
import { useCart } from '../context/CartContext';

export const DEAL_CATEGORIES = {
  appetizer: {
    id: 'appetizer',
    stepNumber: '01',
    stepLabel: 'Step 1 of 5',
    title: '1 Appetizer Choice',
    shortLabel: 'Appetizer',
    type: 'choice',
    prompt: 'Choose 1 of 5 Fresh Appetizers',
    description: 'Crisp handmade pastries, tandoor skewers & spiced fritters',
    options: [
      {
        id: 'app-samosa',
        name: 'Crispy Vegetable Samosa',
        tag: 'Vegetarian • Mild',
        shortDesc: 'Flaky golden pastry filled with spiced potatoes, green peas & cumin',
        fullDesc: 'Two hand-pleated artisanal pastries fried to golden crispness, bursting with tempered cumin potatoes, tender garden peas, and coriander seeds.',
        image: '/images/deal/01_Appetizer_Images_800x533/01_Crispy_Vegetable_Samosa_800x533.jpg'
      },
      {
        id: 'app-tikki',
        name: 'Spiced Aloo Tikki',
        tag: 'Vegetarian • Mild',
        shortDesc: 'Pan-seared spiced potato patties infused with ginger & herbs',
        fullDesc: 'Delicate Delhi street-style potato croquettes pan-seared with fresh ginger, roasted cumin, and fragrant herbs, crisp outside and tender inside.',
        image: '/images/deal/01_Appetizer_Images_800x533/02_Spiced_Aloo_Tikki_800x533.jpg'
      },
      {
        id: 'app-lasuni',
        name: 'Fiery Lasuni Gobi',
        tag: 'Vegetarian • Medium Spicy',
        shortDesc: 'Crisp cauliflower florets tossed in tangy garlic-chili glaze',
        fullDesc: 'Crisp florets of fresh cauliflower tossed in a wok with garlic, Kashmiri red chili reduction, and sweet-sour tomato glaze.',
        image: '/images/deal/01_Appetizer_Images_800x533/03_Fiery_Lasuni_Gobi_800x533.jpg'
      },
      {
        id: 'app-pakoras',
        name: 'Mixed Vegetable Pakoras',
        tag: 'Vegetarian • Mild',
        shortDesc: 'Golden chickpea-battered garden vegetable fritters',
        fullDesc: 'Spinach, onion, and potato ribbons coated in an aromatic roasted cumin and chickpea flour batter, flash-fried until airy and crunch-perfect.',
        image: '/images/deal/01_Appetizer_Images_800x533/04_Mixed_Vegetable_Pakoras_800x533.jpg'
      },
      {
        id: 'app-chicken-tikka',
        name: 'Char-Grilled Chicken Tikka',
        tag: '100% Halal • Clay Oven Classic',
        shortDesc: 'Tender boneless chicken morsels roasted in live tandoor',
        fullDesc: 'Succulent boneless chicken morsels marinated in Kashmiri chili yogurt, fenugreek, and mustard oil, roasted on metal skewers over live tandoor embers.',
        image: '/images/deal/01_Appetizer_Images_800x533/05_Char_Grilled_Chicken_Tikka_800x533.jpg'
      }
    ]
  },
  entree: {
    id: 'entree',
    stepNumber: '02',
    stepLabel: 'Step 2 of 5',
    title: '1 Royal Entrée Choice',
    shortLabel: 'Royal Entrée',
    type: 'choice',
    prompt: 'Choose 1 of 5 Signature Curries',
    description: 'Slow-simmered velvety gravies, rich lamb, paneer or dum biryani',
    options: [
      {
        id: 'entree-ctm',
        name: 'Chicken Tikka Masala',
        tag: 'Chef Signature • 100% Halal',
        shortDesc: 'Char-grilled chicken in creamy tomato-cashew gravy',
        fullDesc: 'Our Manhattan crowd-favorite: clay-oven charred chicken morsels simmered in a velvety sauce of vine-ripened tomatoes, sweet butter, cashew cream, and fenugreek.',
        image: '/images/deal/02_Royal_Entree_5_Images_800x533/01_Chicken_Tikka_Masala_800x533.jpg'
      },
      {
        id: 'entree-roghan',
        name: 'Kashmiri Lamb Roghan Josh',
        tag: 'Kashmiri Classic • 100% Halal',
        shortDesc: 'Tender slow-braised lamb in aromatic crimson gravy',
        fullDesc: 'Authentic Kashmiri slow-braised tender lamb simmered for hours with whole black cardamom, fennel seeds, and sun-dried Kashmiri chilies.',
        image: '/images/deal/02_Royal_Entree_5_Images_800x533/02_Kashmiri_Lamb_Roghan_Josh_800x533.jpg'
      },
      {
        id: 'entree-dal',
        name: 'Slow-Cooked Dal Mughlai',
        tag: 'Vegetarian Classic',
        shortDesc: 'Whole black lentils simmered overnight with cream & butter',
        fullDesc: 'Rich whole urad black lentils slow-simmered for 16 hours over gentle charcoal embers, enriched with fresh dairy butter, cream, and stone-ground spices.',
        image: '/images/deal/02_Royal_Entree_5_Images_800x533/03_Slow_Cooked_Dal_Mughlai_800x533.jpg'
      },
      {
        id: 'entree-saag',
        name: 'Royal Saag Paneer',
        tag: 'Vegetarian Classic',
        shortDesc: 'Artisanal cheese cubes in garlic-simmered fresh spinach',
        fullDesc: 'Tender golden cubes of artisanal Indian cottage cheese gently simmered in a velvety puree of hand-picked spinach leaves with garlic, ginger, and roasted cumin.',
        image: '/images/deal/02_Royal_Entree_5_Images_800x533/04_Royal_Saag_Paneer_800x533.jpg'
      },
      {
        id: 'entree-biryani',
        name: 'Signature Dum Biryani',
        tag: 'Royal Dum Pukht • 100% Halal',
        shortDesc: 'Aged basmati layered with meat, saffron & golden onions',
        fullDesc: 'Imperial layered long-grain basmati rice sealed in a traditional handi pot with fragrant saffron milk, caramelized shallots, whole spices, and tender meat.',
        image: '/images/deal/02_Royal_Entree_5_Images_800x533/05_Signature_Dum_Biryani_800x533.jpg'
      }
    ]
  },
  rice: {
    id: 'rice',
    stepNumber: '03',
    stepLabel: 'Included with Deal',
    title: 'Steaming Basmati Rice',
    shortLabel: 'Basmati Rice',
    type: 'included',
    prompt: 'Pick Your Free Basmati Rice Preparation',
    description: 'Fragrant Himalayan aged long-grain rice included with every meal',
    options: [
      {
        id: 'rice-saffron',
        name: 'Saffron Infused Basmati Rice',
        tag: 'Free with Deal • Royal Favorite',
        shortDesc: 'Aged Himalayan rice steeped with fragrant Kashmiri saffron',
        fullDesc: 'Extra-long grain basmati steeped with royal Kashmiri saffron strands and bay leaves for a radiant golden hue and delicate aroma.',
        image: '/images/deal/03_Free_Rice_5_Images_800x533/01_Saffron_Infused_Basmati_Rice_800x533.jpg'
      },
      {
        id: 'rice-jeera',
        name: 'Fragrant Jeera Cumin Rice',
        tag: 'Free with Deal • Aromatic',
        shortDesc: 'Basmati rice tempered with roasted cumin seeds & desi ghee',
        fullDesc: 'Fluffy steamed basmati tossed in a sizzle of whole cumin seeds roasted in pure desi ghee with a pinch of pink salt.',
        image: '/images/deal/03_Free_Rice_5_Images_800x533/02_Fragrant_Jeera_Cumin_Rice_800x533.jpg'
      },
      {
        id: 'rice-pulao',
        name: 'Kashmiri Royal Pulao',
        tag: 'Free with Deal • Sweet & Nutty',
        shortDesc: 'Saffron rice with golden raisins & toasted cashews',
        fullDesc: 'Imperial festive rice layered with saffron, plump golden raisins, toasted cashews, and aromatic cardamom pods.',
        image: '/images/deal/03_Free_Rice_5_Images_800x533/03_Kashmiri_Royal_Pulao_800x533.jpg'
      },
      {
        id: 'rice-steamed',
        name: 'Classic Steamed Basmati',
        tag: 'Free with Deal • Pure & Light',
        shortDesc: 'Pure extra-long grain basmati steamed to fluffy perfection',
        fullDesc: 'Naturally aged Himalayan basmati grains gently steamed so each grain remains separate, light, and fragrant.',
        image: '/images/deal/03_Free_Rice_5_Images_800x533/04_Classic_Steamed_Basmati_800x533.jpg'
      },
      {
        id: 'rice-matar',
        name: 'Sweet Green Peas Pulao',
        tag: 'Free with Deal • Garden Fresh',
        shortDesc: 'Aromatic basmati rice cooked with sweet green peas',
        fullDesc: 'Fragrant basmati rice cooked together with sweet garden green peas, mild whole cloves, and subtle Indian spices.',
        image: '/images/deal/03_Free_Rice_5_Images_800x533/05_Sweet_Green_Peas_Pulao_800x533.jpg'
      }
    ]
  },
  bread: {
    id: 'bread',
    stepNumber: '04',
    stepLabel: 'Included with Deal',
    title: 'Fresh Tandoori Naan',
    shortLabel: 'Tandoori Bread',
    type: 'included',
    prompt: 'Pick Your Free Clay Oven Tandoori Bread',
    description: 'Handcrafted flatbread baked fresh against 800°F clay oven walls',
    options: [
      {
        id: 'bread-garlic',
        name: 'Blistered Butter Garlic Naan',
        tag: 'Free with Deal • Most Popular',
        shortDesc: 'Topped with roasted garlic, cilantro & melted butter glaze',
        fullDesc: 'Pillowy soft leavened dough slapped against roaring tandoor walls, charred to blistered perfection and brushed with roasted garlic butter.',
        image: '/images/deal/04_Free_Naan_5_Images_800x533/01_Blistered_Butter_Garlic_Naan_800x533.jpg'
      },
      {
        id: 'bread-plain',
        name: 'Traditional Plain Naan',
        tag: 'Free with Deal • Classic',
        shortDesc: 'Classic soft and fluffy leavened bread from the clay oven',
        fullDesc: 'The quintessential Delhi accompaniment: tear-shaped, fluffy leavened bread with airy pockets and crisp golden blisters.',
        image: '/images/deal/04_Free_Naan_5_Images_800x533/02_Traditional_Plain_Naan_800x533.jpg'
      },
      {
        id: 'bread-paratha',
        name: 'Flaky Spiral Lachha Paratha',
        tag: 'Free with Deal • Flaky & Rich',
        shortDesc: 'Multi-layered spiral whole-wheat bread with crispy crust',
        fullDesc: 'Hand-rolled spiral whole-wheat flatbread layered with pure butter, creating dozens of paper-thin flaky layers.',
        image: '/images/deal/04_Free_Naan_5_Images_800x533/03_Flaky_Spiral_Lachha_Paratha_800x533.jpg'
      },
      {
        id: 'bread-kulcha',
        name: 'Spiced Onion Kulcha',
        tag: 'Free with Deal • Savory',
        shortDesc: 'Tandoor bread stuffed with seasoned onions & herbs',
        fullDesc: 'Leavened flatbread stuffed with finely minced red onions, fresh coriander, green chilies, and tangy amchur spice.',
        image: '/images/deal/04_Free_Naan_5_Images_800x533/04_Spiced_Onion_Kulcha_800x533.jpg'
      },
      {
        id: 'bread-roti',
        name: 'Crisp Tandoori Roti',
        tag: 'Free with Deal • Whole Wheat',
        shortDesc: 'Stone-ground whole-wheat flatbread with charred blisters',
        fullDesc: 'Wholesome unleavened stone-ground whole wheat dough cooked over live clay embers, crispy, light, and naturally nutritious.',
        image: '/images/deal/04_Free_Naan_5_Images_800x533/05_Crisp_Tandoori_Roti_800x533.jpg'
      }
    ]
  },
  condiments: {
    id: 'condiments',
    stepNumber: '05',
    stepLabel: 'Included with Deal',
    title: 'House Chutney & Raita',
    shortLabel: 'Chutney & Raita',
    type: 'included',
    prompt: 'Always Included with Every Deal Order',
    description: 'Refreshing accompaniments to balance spices and complement breads',
    options: [
      {
        id: 'cond-mango',
        name: 'Sweet Alphonso Mango Chutney',
        tag: 'Free with Deal • Complimentary Pair',
        shortDesc: 'Sweet Alphonso mango preserve spiced with ginger & whole cumin',
        fullDesc: 'Imperial sweet mango relish prepared from sun-ripened Alphonso mangoes, infused with crushed ginger, fresh mint, and whole toasted spices.',
        image: '/images/deal/05_Free_Dips_2_Images_800x533/01_Sweet_Mango_Chutney_800x533.jpg'
      },
      {
        id: 'cond-raita',
        name: 'Chilled Cucumber Yogurt Raita',
        tag: 'Free with Deal • Complimentary Pair',
        shortDesc: 'Whipped whole milk yogurt with grated cucumber & roasted cumin',
        fullDesc: 'Chilled whipped whole milk yogurt raita folded with freshly grated English cucumber, roasted cumin powder, and fresh garden mint.',
        image: '/images/deal/05_Free_Dips_2_Images_800x533/02_Chilled_Cucumber_Raita_800x533.jpg'
      }
    ]
  }
};

const STEP_KEYS = ['appetizer', 'entree', 'rice', 'bread', 'condiments'];

export default function SpecialDealSection() {
  const { addToCart } = useCart();

  // Active step in builder: 'appetizer' | 'entree' | 'rice' | 'bread' | 'condiments'
  const [activeStep, setActiveStep] = useState('appetizer');

  // User's customized choices
  const [selectedAppetizer, setSelectedAppetizer] = useState(DEAL_CATEGORIES.appetizer.options[0]);
  const [selectedEntree, setSelectedEntree] = useState(DEAL_CATEGORIES.entree.options[0]);
  const [selectedRice, setSelectedRice] = useState(DEAL_CATEGORIES.rice.options[0]);
  const [selectedBread, setSelectedBread] = useState(DEAL_CATEGORIES.bread.options[0]);

  // Preview item shown in the right showcase
  const [previewDish, setPreviewDish] = useState(DEAL_CATEGORIES.appetizer.options[0]);
  const [dealAdded, setDealAdded] = useState(false);

  // Auto-cycle state: cycles through all 5 cards every 3.8s when not paused
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef(null);

  // References for pixel-perfect bottom border alignment
  const leftColumnRef = useRef(null);
  const leftBoxRef = useRef(null);
  const rightCardRef = useRef(null);
  const [targetHeight, setTargetHeight] = useState(null);
  const lastStandardHeightRef = useRef(640);

  // Helper to retrieve the current selection or default for any step
  const getStepDish = (stepKey) => {
    if (stepKey === 'appetizer') return selectedAppetizer;
    if (stepKey === 'entree') return selectedEntree;
    if (stepKey === 'rice') return selectedRice;
    if (stepKey === 'bread') return selectedBread;
    if (stepKey === 'condiments') return DEAL_CATEGORIES.condiments.options[0];
    return selectedAppetizer;
  };

  // Helper to pause auto-cycle temporarily after explicit user interaction
  const pauseTemporarily = (duration = 7500) => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, duration);
  };

  // Quick switch active step
  const handleSelectStep = (stepKey, isManual = true) => {
    setActiveStep(stepKey);
    setPreviewDish(getStepDish(stepKey));
    if (isManual) {
      pauseTemporarily();
    }
  };

  // Auto-cycle through the 5 steps every 3.8s
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveStep((prevStep) => {
        const currentIndex = STEP_KEYS.indexOf(prevStep);
        const nextIndex = (currentIndex + 1) % STEP_KEYS.length;
        const nextStep = STEP_KEYS[nextIndex];
        setPreviewDish(getStepDish(nextStep));
        return nextStep;
      });
    }, 3800);

    return () => clearInterval(timer);
  }, [isPaused, selectedAppetizer, selectedEntree, selectedRice, selectedBread]);

  // Cleanup pause timeout on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const measureAlignment = () => {
      if (typeof window !== 'undefined' && window.innerWidth >= 1024 && leftBoxRef.current && rightCardRef.current) {
        if (activeStep === 'condiments') {
          // Do not shrink for condiments; maintain the standard height of the other 4 steps
          setTargetHeight(lastStandardHeightRef.current);
          return;
        }

        const boxRect = leftBoxRef.current.getBoundingClientRect();
        const rightRect = rightCardRef.current.getBoundingClientRect();
        // Exact vertical distance from top of right card to bottom border of left Feast Tray box
        const exactHeight = Math.round(boxRect.bottom - rightRect.top);
        if (exactHeight > 500) {
          lastStandardHeightRef.current = exactHeight;
          setTargetHeight(exactHeight);
        } else if (exactHeight > 250) {
          setTargetHeight(exactHeight);
        }
      } else {
        setTargetHeight(null);
      }
    };

    measureAlignment();

    const frameId = requestAnimationFrame(measureAlignment);
    const timeoutId1 = setTimeout(measureAlignment, 100);
    const timeoutId2 = setTimeout(measureAlignment, 300);

    const ro = new ResizeObserver(() => {
      measureAlignment();
    });

    if (leftColumnRef.current) ro.observe(leftColumnRef.current);
    if (leftBoxRef.current) ro.observe(leftBoxRef.current);
    window.addEventListener('resize', measureAlignment);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      ro.disconnect();
      window.removeEventListener('resize', measureAlignment);
    };
  }, [activeStep, selectedAppetizer, selectedEntree, selectedRice, selectedBread, previewDish]);

  // Pick an option for current active step
  const handlePickOption = (option) => {
    setPreviewDish(option);

    if (activeStep === 'appetizer') {
      setSelectedAppetizer(option);
    } else if (activeStep === 'entree') {
      setSelectedEntree(option);
    } else if (activeStep === 'rice') {
      setSelectedRice(option);
    } else if (activeStep === 'bread') {
      setSelectedBread(option);
    }

    pauseTemporarily();
  };

  // Add the completely customized 5-piece meal to Cart
  const handleAddDealToCart = () => {
    addToCart(
      {
        id: 'deal-2295',
        name: '$22.95 Delivery & Takeout Special Deal',
        price: '$22.95',
        priceNum: 22.95,
        image: selectedEntree.image || '/images/deal/02_Royal_Entree_5_Images_800x533/01_Chicken_Tikka_Masala_800x533.jpg',
        isDeal: true,
        categoryName: 'Signature Special Deal'
      },
      {
        dealAppetizer: selectedAppetizer.name,
        dealEntree: selectedEntree.name,
        dealRice: selectedRice.name,
        dealBread: selectedBread.name,
        dealCondiments: 'House Mango Chutney & Cucumber Raita',
      }
    );

    setDealAdded(true);
    setTimeout(() => setDealAdded(false), 2400);
  };

  const currentCategory = DEAL_CATEGORIES[activeStep];
  const currentStepIndex = STEP_KEYS.indexOf(activeStep);
  const prevStepKey = currentStepIndex > 0 ? STEP_KEYS[currentStepIndex - 1] : null;
  const nextStepKey = currentStepIndex < STEP_KEYS.length - 1 ? STEP_KEYS[currentStepIndex + 1] : null;

  // Helper to check if an option is currently selected
  const isOptionSelected = (opt) => {
    if (activeStep === 'appetizer') return selectedAppetizer.id === opt.id;
    if (activeStep === 'entree') return selectedEntree.id === opt.id;
    if (activeStep === 'rice') return selectedRice.id === opt.id;
    if (activeStep === 'bread') return selectedBread.id === opt.id;
    return true;
  };

  return (
    <section id="special-deal" className="py-16 sm:py-20 bg-[#161313] relative overflow-hidden border-b border-mughlai-border [isolation:isolate]">
      <div id="deal-builder" className="absolute -top-24 pointer-events-none" />
      
      {/* Background Ambience Glow - Zero-cost Radial Gradient instead of heavy blur-3xl */}
      <div 
        className="absolute top-1/3 right-1/4 w-96 h-96 pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(252, 75, 23, 0.12) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-10 left-10 w-96 h-96 pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(74, 14, 23, 0.22) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Top Header: High-Clarity Value Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-mughlai-red/25 border border-mughlai-gold/40 px-4 py-1.5 rounded-full text-xs font-semibold text-mughlai-goldLight shadow-sm">
            <Flame className="w-4 h-4 text-mughlai-flame animate-pulse" />
            <span>{preventOrphans("Exclusive Signature Special • Complete 5-Piece Feast")}</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-[42px] font-bold text-white leading-tight heading-balanced">
            {preventOrphans("Customize Your $22.95 Royal Meal")}
          </h2>

          <div className="flex items-center justify-center gap-3 pt-1">
            <span className="font-display text-4xl sm:text-5xl font-extrabold gold-text">
              $22.95
            </span>
            <div className="text-left font-swiss text-xs sm:text-sm text-gray-300">
              <span className="block font-bold text-white">All 5 Dishes Included</span>
              <span className="text-[#A8A8A8]">Designed for 1 hungry diner or shared between 2</span>
            </div>
          </div>
        </div>

        {/* 5-Step Progress & Component Tabs Bar */}
        <div 
          className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 mb-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Step 1: Appetizer */}
          <button
            type="button"
            onClick={() => handleSelectStep('appetizer')}
            className={`p-3 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
              activeStep === 'appetizer'
                ? 'bg-gradient-to-br from-mughlai-red/35 via-mughlai-maroon/25 to-black/60 border-mughlai-gold shadow-lg shadow-mughlai-red/20 ring-1 ring-mughlai-gold/50'
                : 'bg-[#1C1818] border-white/10 hover:border-white/25 hover:bg-[#221D1D]'
            }`}
          >
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-mughlai-gold font-bold flex items-center gap-1.5">
                {activeStep === 'appetizer' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-mughlai-gold shadow-[0_0_6px_#D4AF37] animate-pulse shrink-0" />
                )}
                01. Appetizer
              </span>
              <span className="w-4 h-4 rounded-full bg-mughlai-gold/20 text-mughlai-gold flex items-center justify-center text-[10px]">
                ✓
              </span>
            </div>
            <p className="text-xs sm:text-[13px] font-bold text-white line-clamp-1">
              {selectedAppetizer.name}
            </p>
            <span className="text-[10px] text-gray-400 mt-0.5">Click to change</span>
          </button>

          {/* Step 2: Royal Entrée */}
          <button
            type="button"
            onClick={() => handleSelectStep('entree')}
            className={`p-3 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
              activeStep === 'entree'
                ? 'bg-gradient-to-br from-mughlai-red/35 via-mughlai-maroon/25 to-black/60 border-mughlai-gold shadow-lg shadow-mughlai-red/20 ring-1 ring-mughlai-gold/50'
                : 'bg-[#1C1818] border-white/10 hover:border-white/25 hover:bg-[#221D1D]'
            }`}
          >
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-mughlai-gold font-bold flex items-center gap-1.5">
                {activeStep === 'entree' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-mughlai-gold shadow-[0_0_6px_#D4AF37] animate-pulse shrink-0" />
                )}
                02. Royal Entrée
              </span>
              <span className="w-4 h-4 rounded-full bg-mughlai-gold/20 text-mughlai-gold flex items-center justify-center text-[10px]">
                ✓
              </span>
            </div>
            <p className="text-xs sm:text-[13px] font-bold text-white line-clamp-1">
              {selectedEntree.name}
            </p>
            <span className="text-[10px] text-gray-400 mt-0.5">Click to change</span>
          </button>

          {/* Step 3: Basmati Rice */}
          <button
            type="button"
            onClick={() => handleSelectStep('rice')}
            className={`p-3 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
              activeStep === 'rice'
                ? 'bg-gradient-to-br from-mughlai-red/35 via-mughlai-maroon/25 to-black/60 border-mughlai-gold shadow-lg shadow-mughlai-red/20 ring-1 ring-mughlai-gold/50'
                : 'bg-[#1C1818] border-white/10 hover:border-white/25 hover:bg-[#221D1D]'
            }`}
          >
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                {activeStep === 'rice' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399] animate-pulse shrink-0" />
                )}
                03. Free Rice
              </span>
              <span className="px-1.5 py-0.2 bg-emerald-950/60 border border-emerald-500/40 text-[9px] text-emerald-300 rounded font-mono">
                Included
              </span>
            </div>
            <p className="text-xs sm:text-[13px] font-bold text-white line-clamp-1">
              {selectedRice.name}
            </p>
            <span className="text-[10px] text-gray-400 mt-0.5">Pick prep style</span>
          </button>

          {/* Step 4: Tandoori Bread */}
          <button
            type="button"
            onClick={() => handleSelectStep('bread')}
            className={`p-3 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
              activeStep === 'bread'
                ? 'bg-gradient-to-br from-mughlai-red/35 via-mughlai-maroon/25 to-black/60 border-mughlai-gold shadow-lg shadow-mughlai-red/20 ring-1 ring-mughlai-gold/50'
                : 'bg-[#1C1818] border-white/10 hover:border-white/25 hover:bg-[#221D1D]'
            }`}
          >
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                {activeStep === 'bread' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399] animate-pulse shrink-0" />
                )}
                04. Free Naan
              </span>
              <span className="px-1.5 py-0.2 bg-emerald-950/60 border border-emerald-500/40 text-[9px] text-emerald-300 rounded font-mono">
                Included
              </span>
            </div>
            <p className="text-xs sm:text-[13px] font-bold text-white line-clamp-1">
              {selectedBread.name}
            </p>
            <span className="text-[10px] text-gray-400 mt-0.5">Pick bread type</span>
          </button>

          {/* Step 5: Condiments */}
          <button
            type="button"
            onClick={() => handleSelectStep('condiments')}
            className={`col-span-2 sm:col-span-1 p-3 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
              activeStep === 'condiments'
                ? 'bg-gradient-to-br from-mughlai-red/35 via-mughlai-maroon/25 to-black/60 border-mughlai-gold shadow-lg shadow-mughlai-red/20 ring-1 ring-mughlai-gold/50'
                : 'bg-[#1C1818] border-white/10 hover:border-white/25 hover:bg-[#221D1D]'
            }`}
          >
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                {activeStep === 'condiments' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399] animate-pulse shrink-0" />
                )}
                05. Free Dips
              </span>
              <span className="px-1.5 py-0.2 bg-emerald-950/60 border border-emerald-500/40 text-[9px] text-emerald-300 rounded font-mono">
                Included
              </span>
            </div>
            <p className="text-xs sm:text-[13px] font-bold text-white line-clamp-1">
              Mango Chutney & Raita
            </p>
            <span className="text-[10px] text-gray-400 mt-0.5">Both paired free</span>
          </button>

        </div>

        {/* Main 2-Column Work Area: Left Interactive Selection / Right Live Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (7 cols): Option Selection Grid for Active Step */}
          <div ref={leftColumnRef} className="lg:col-span-7 space-y-6">
            
            {/* Step Heading (Clean Typography, No Heavy Box Container) */}
            <div className="flex items-center justify-between gap-3 pt-1 pb-1">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-mughlai-gold/20 border border-mughlai-gold/40 text-mughlai-gold text-[10px] font-mono font-bold uppercase">
                    {currentCategory.stepLabel}
                  </span>
                  <span className="text-xs text-[#A8A8A8] font-swiss">
                    {currentCategory.type === 'choice' ? 'Pick 1 favorite' : 'Included with your order'}
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                  {currentCategory.prompt}
                </h3>
              </div>

              {/* Step Navigation Controls for ALL 5 Steps (Pure Icons, No Text) */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleSelectStep(prevStepKey || STEP_KEYS[STEP_KEYS.length - 1])}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition border border-white/15 bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white active:scale-95 shadow-sm"
                  aria-label="Previous step"
                  title="Previous step"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectStep(nextStepKey || STEP_KEYS[0])}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition border border-mughlai-gold/40 hover:border-mughlai-gold bg-mughlai-gold/15 hover:bg-mughlai-red text-mughlai-goldLight hover:text-white active:scale-95 shadow-sm"
                  aria-label="Next step"
                  title="Next step"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* List of Selectable Options for this Category - 2-Column Responsive Grid */}
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {currentCategory.options.map((option) => {
                const selected = isOptionSelected(option);
                const isPreview = previewDish.id === option.id;
                const isSingleOption = currentCategory.options.length === 1;

                return (
                  <div
                    key={option.id}
                    onClick={() => handlePickOption(option)}
                    className={`p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center gap-3 select-none ${
                      isSingleOption ? 'sm:col-span-2' : ''
                    } ${
                      selected
                        ? 'bg-gradient-to-r from-mughlai-red/30 via-[#2A1719] to-[#1C1818] border-mughlai-gold shadow-lg shadow-mughlai-red/15 ring-1 ring-mughlai-gold/40'
                        : isPreview
                        ? 'bg-[#221C1C] border-white/30 text-white'
                        : 'bg-[#181515] border-white/10 hover:border-white/25 hover:bg-[#1E1919] opacity-85 hover:opacity-100'
                    }`}
                  >
                    {/* Dish Mini Thumbnail */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 border border-white/15 bg-black/50 shadow relative">
                      <img
                        src={option.image}
                        alt={option.name}
                        className="w-full h-full object-cover"
                      />
                      {selected && (
                        <div className="absolute inset-0 bg-mughlai-red/40 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white stroke-[3] drop-shadow" />
                        </div>
                      )}
                    </div>

                    {/* Dish Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5">
                        <h4 className={`text-xs sm:text-sm font-bold truncate ${selected ? 'text-white' : 'text-gray-200'}`}>
                          {preventOrphans(option.name)}
                        </h4>
                      </div>
                      <p className="text-[11px] text-[#A8A8A8] mt-0.5 line-clamp-1 font-swiss">
                        {preventOrphans(option.shortDesc)}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-mughlai-gold border border-mughlai-gold/25">
                          {option.tag.split('•')[0]}
                        </span>
                      </div>
                    </div>

                    {/* Select Radio Pill */}
                    <div className="shrink-0 flex items-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePickOption(option);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ${
                          selected
                            ? 'bg-gradient-to-r from-mughlai-red to-mughlai-flame text-white shadow-md'
                            : 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white border border-white/10'
                        }`}
                      >
                        {selected ? (
                          <>
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>Selected</span>
                          </>
                        ) : (
                          <span>Select</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Customized Feast Tray Summary Banner */}
            <div 
              ref={leftBoxRef} 
              className="bg-[#141011] border-2 border-mughlai-gold/40 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-mughlai-gold" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Your Complete 5-Piece Feast Tray
                  </span>
                </div>
                <span className="font-mono font-extrabold text-sm text-mughlai-gold">
                  $22.95 Total
                </span>
              </div>

              {/* 5 Configured Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-swiss">
                <div className="flex items-center gap-2 bg-black/40 p-2 rounded-lg border border-white/5">
                  <span className="text-mughlai-gold font-bold shrink-0">1. Appetizer:</span>
                  <span className="text-white truncate font-medium">{selectedAppetizer.name}</span>
                </div>
                <div className="flex items-center gap-2 bg-black/40 p-2 rounded-lg border border-white/5">
                  <span className="text-mughlai-gold font-bold shrink-0">2. Entrée:</span>
                  <span className="text-white truncate font-medium">{selectedEntree.name}</span>
                </div>
                <div className="flex items-center gap-2 bg-black/40 p-2 rounded-lg border border-white/5">
                  <span className="text-emerald-400 font-bold shrink-0">3. Rice:</span>
                  <span className="text-white truncate font-medium">{selectedRice.name}</span>
                </div>
                <div className="flex items-center gap-2 bg-black/40 p-2 rounded-lg border border-white/5">
                  <span className="text-emerald-400 font-bold shrink-0">4. Naan:</span>
                  <span className="text-white truncate font-medium">{selectedBread.name}</span>
                </div>
                <div className="flex items-center gap-2 bg-black/40 p-2 rounded-lg border border-white/5">
                  <span className="text-emerald-400 font-bold shrink-0">5. Condiments:</span>
                  <span className="text-white truncate font-medium">Mango Chutney & Cucumber Raita</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-gray-400">
                <span className="flex items-center gap-1.5 text-mughlai-goldLight/80">
                  <Sparkles className="w-3.5 h-3.5 text-mughlai-gold shrink-0" />
                  <span>Always Included with Every $22.95 Feast Order</span>
                </span>
                <span className="text-emerald-400 font-medium font-mono">100% Halal Certified</span>
              </div>
            </div>

            {/* Final Order Call-To-Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={handleAddDealToCart}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 hover:brightness-110 text-white font-bold text-sm px-8 py-4 rounded-xl shadow-2xl transition transform hover:-translate-y-0.5 active:scale-95 group ${
                  dealAdded
                    ? 'bg-emerald-700 shadow-emerald-900/40 ring-2 ring-emerald-400'
                    : 'bg-gradient-to-r from-mughlai-red via-[#A81C24] to-mughlai-flame shadow-mughlai-red/40'
                }`}
              >
                {dealAdded ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-300 stroke-[3]" />
                    <span>Added Custom $22.95 Deal to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 text-mughlai-gold group-hover:scale-110 transition-transform" />
                    <span>Add Customized $22.95 Deal to Bag</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
                <ShieldCheck className="w-4 h-4 text-mughlai-gold shrink-0" />
                <span>{preventOrphans("Delivered Hot from Nearest Manhattan Kitchen")}</span>
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Live Michelin-Star Showcase for Selected/Previewed Dish */}
          <div className="lg:col-span-5 relative">
            <div 
              ref={rightCardRef}
              className="relative rounded-3xl overflow-hidden border-2 border-mughlai-gold/60 shadow-[0_8px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.2)] bg-[#0F0D0D] flex flex-col justify-between transform-gpu"
              style={{
                minHeight: targetHeight ? `${Math.max(targetHeight, 460)}px` : '460px',
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              
              {/* Main Dish Photo (Expands smoothly to fill top area) */}
              <div className="flex-1 min-h-[180px] sm:min-h-[220px] relative overflow-hidden bg-black/60">
                <img
                  src={previewDish.image}
                  alt={previewDish.name}
                  className="w-full h-full object-cover transition-all duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140E0F] via-transparent via-60% pointer-events-none" />
              </div>

              {/* Dish Culinary Story & Information */}
              <div className="p-6 bg-gradient-to-b from-[#140E0F] to-[#1A1516] space-y-3 relative z-20 -mt-8 pt-4 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-mughlai-gold font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-mughlai-gold" />
                    <span>{previewDish.tag}</span>
                  </span>
                </div>

                <h4 className="font-display font-bold text-white text-xl sm:text-2xl leading-tight heading-balanced">
                  {preventOrphans(previewDish.name)}
                </h4>

                <p className="text-xs sm:text-sm text-[#D8D8D8] font-swiss leading-relaxed paragraph-balanced">
                  {preventOrphans(previewDish.fullDesc || previewDish.shortDesc)}
                </p>

                {/* Quick Switch Thumbnails for Current Category */}
                <div className="pt-3 border-t border-white/10">
                  <span className="text-[11px] font-mono text-gray-400 block mb-2">
                    All options in this step:
                  </span>
                  <div className="flex items-center gap-2.5 overflow-x-auto py-2 px-1 scrollbar-none">
                    {currentCategory.options.map((opt) => {
                      const isChosen = isOptionSelected(opt);
                      const isPreviewing = previewDish.id === opt.id;

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handlePickOption(opt)}
                          className={`w-[54px] h-[54px] rounded-lg overflow-hidden shrink-0 border transition relative ${
                            isChosen
                              ? 'border-[1.5px] border-mughlai-gold shadow-sm shadow-mughlai-gold/20'
                              : isPreviewing
                              ? 'border-white/60'
                              : 'border-white/15 opacity-60 hover:opacity-100 hover:border-white/40'
                          }`}
                          title={opt.name}
                        >
                          <img
                            src={opt.image}
                            alt={opt.name}
                            className="w-full h-full object-cover"
                          />
                          {isChosen && (
                            <div className="absolute inset-0 bg-mughlai-red/35 flex items-center justify-center">
                              <Check className="w-4 h-4 text-white stroke-[2.5]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

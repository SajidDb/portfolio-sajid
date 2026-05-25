// src/data.js

// ==========================================
// 1️⃣ TES PROJETS (ÉTUDES DE CAS & PREUVES)
// ==========================================
export const projectsData = [
  {
    id: 'myplumor',
    title: 'MyPlumOr',
    color: '#FF4500',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      '/myplumorsalon.png', 
      '/myplumorprofil.png', 
      '/myplumorlivre.png',
      '/A.png',
      '/B.png',
      '/C.png',
      '/D.png',
      '/E.png',
      '/F.png'
    ],
    url: 'https://myplumor.com',
    subtitle: 'Plateforme Librairie Numérique',
    role: 'Fondateur & Développeur Fullstack',
    date: 'Janv. 2026 - Aujourd\'hui',
    context: 'Création de Micro-entreprise',
    description: "MyPlumOr est un écosystème web innovant dédié à la littérature numérique, conçu pour repenser la publication et la vente de livres dématérialisés en offrant une expérience auteur/lecteur fluide et immersive.",
    details: "Développement d'une architecture robuste en React/Next.js couplée à Firebase. Modélisation de la base de données, sécurisation des accès et intégration de l'API Stripe Connect pour automatiser la rémunération des auteurs.",
    
    deepDive: {
      architecture: "L'application repose sur une architecture JAMstack moderne. Le Frontend est propulsé par Next.js (React) pour garantir un excellent référencement (SEO) des livres et des performances de rendu côté serveur (SSR). Pour le Backend, j'ai opté pour Firebase (NoSQL) afin d'assurer une synchronisation en temps réel et une authentification sécurisée.",
      challenges: [
        {
          title: "Répartition des paiements complexes",
          description: "Le plus gros défi a été la gestion financière : lorsqu'un lecteur achète un livre, l'argent doit être instantanément divisé entre la commission de la plateforme et le compte bancaire de l'auteur. J'ai résolu ce problème en intégrant l'API Stripe Connect avec des webhooks sécurisés."
        },
        {
          title: "Sécurité des œuvres numériques",
          description: "Empêcher le téléchargement illégal des livres. J'ai implémenté un système de tokens signés et d'accès restreints via les Security Rules de Firebase."
        }
      ],
      codeSnippet: {
        filename: "stripePaymentService.js",
        language: "javascript",
        code: `// Intégration de Stripe Connect pour le split de paiement
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function createCheckoutSession(book, authorStripeId) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        name: book.title,
        amount: book.price * 100, // En centimes
        currency: 'eur',
        quantity: 1,
      }],
      payment_intent_data: {
        // Commission de la plateforme (ex: 15%)
        application_fee_amount: Math.round(book.price * 100 * 0.15),
        // Transfert automatique vers le compte de l'auteur
        transfer_data: {
          destination: authorStripeId,
        },
      },
      success_url: \`\${process.env.DOMAIN}/success\`,
      cancel_url: \`\${process.env.DOMAIN}/cancel\`,
    });
    return session.url;
  } catch (error) {
    console.error("Erreur d'initialisation Stripe:", error);
    throw new Error('Payment processing failed');
  }
}`
      }
    },
    techs: ['React / Next.js', 'Firebase', 'API Stripe', 'Stripe Connect']
  },
  {
    id: 'composmart',
    title: 'Composmart',
    color: '#4ade80',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      '/3.png',
      '/4.png',
      '/5.png',
      '/6.png',
      '/7.png',
      '/8.png',
      '/9.png',
      '/10.png',
      '/11.png',
      '/12.png'
    ],
    url: null,
    subtitle: 'Innovation Écologique',
    role: 'Co-créateur & Développeur',
    date: 'Oct. 2025 - Janv. 2026',
    context: 'Projet d\'Innovation',
    description: "Conception d'un système de composteur connecté intégrant un mécanisme de récompense algorithmique pour encourager la participation active des habitants.",
    details: "Collaboration étroite au sein d'une équipe de développement pour élaborer l'analyse stratégique (SWOT), la gérance de la communication globale et le prototypage de la solution technique.",
    
    deepDive: {
      architecture: "Le projet a nécessité une double approche : d'un côté la modélisation et l'ingénierie des capteurs IoT embarqués dans le composteur, de l'autre la création d'une architecture logicielle permettant de centraliser les données de pesée et de les attribuer aux profils utilisateurs.",
      challenges: [
        {
          title: "Algorithme de gamification",
          description: "Concevoir un algorithme juste qui convertit le poids des déchets organiques déposés en 'points écologiques' utilisables chez des commerçants partenaires, en évitant les failles de triche."
        },
        {
          title: "Stratégie de marque (AMOA)",
          description: "La technique ne suffisait pas : j'ai activement participé à l'idéation, au positionnement sur le marché et à la réalisation de l'analyse SWOT pour prouver la viabilité économique du projet au jury."
        }
      ],
      codeSnippet: {
        filename: "RewardAlgorithm.js",
        language: "javascript",
        code: `// Calcul algorithmique des récompenses utilisateurs
function calculateEcoPoints(wasteWeightKg, wasteType, userStreak) {
  const BASE_MULTIPLIER = 10; // 10 points par Kg
  let points = wasteWeightKg * BASE_MULTIPLIER;
  
  // Bonus selon la qualité du tri (évaluée par les capteurs)
  if (wasteType === 'optimal_green') {
    points *= 1.25; 
  }
  
  // Bonus de fidélité pour encourager l'habitude (Gamification)
  if (userStreak >= 7) {
    points += 50; // Bonus d'une semaine consécutive
  }
  
  return Math.round(points);
}

// Mise à jour de la BDD utilisateur
async function updateUserPoints(userId, pointsEarned) {
  const db = getDatabase();
  await db.collection('users').doc(userId).update({
    totalPoints: increment(pointsEarned),
    lastDepositDate: new Date()
  });
}`
      }
    },
    techs: ['Innovation', 'Architecture', 'Stratégie', 'Travail en équipe']
  },
  {
    id: 'allopizza',
    title: 'Allo Pizza',
    color: '#a855f7',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      '/al.png', 
      '/allo.png',
      '/allop.png',
      '/allopi.png',
      '/allopiz.png'
    ],
    url: 'https://allo-pizza-amiens.fr',
    
    // 👇 LE NOUVEAU BOUTON CV APPARAÎTRA GRÂCE À ÇA 👇
    document: {
      label: " MON RAPPORT DE STAGE",
      file: "/Rapport_STAGE_Sajid.pdf" // Assure-toi que Rapport_STAGE_Sajid.pdf est bien dans le dossier public/
    },

    subtitle: 'Système E-commerce',
    role: 'Développeur Web (Stage)',
    date: 'Janv. - Mars 2026',
    context: 'Pizzeria',
    description: "Refonte intégrale et création d'un site e-commerce sur-mesure pour fluidifier la prise de commande en ligne et fidéliser la clientèle locale.",
    details: "Suite à l'analyse des besoins de la gérance, développement complet du backend en Java et mise en place d'une base de données NoSQL optimisée pour la gestion de l'inventaire et des historiques en temps réel.",
    
    deepDive: {
      architecture: "L'application s'appuie sur un Backend robuste développé en Java. Pour la base de données, l'utilisation d'une structure NoSQL s'est imposée afin d'absorber des pics de commandes très variables (notamment les soirs de week-end) et de gérer des structures de données flexibles (ex: pizzas avec suppléments infinis).",
      challenges: [
        {
          title: "Gestion de l'inventaire en temps réel",
          description: "La problématique majeure était d'éviter les commandes d'ingrédients en rupture de stock. J'ai mis en place un système de transactions atomiques dans la base de données pour décrémenter le stock dès la mise au panier."
        },
        {
          title: "Expression des besoins (AMOA)",
          description: "Traduire les besoins d'un gérant de pizzeria (qui n'est pas technique) en cahier des charges précis, maquettes UI/UX, puis en modèles de données logiciels."
        }
      ],
      codeSnippet: {
        filename: "OrderController.java",
        language: "java",
        code: `// Contrôleur Backend (Java) : Validation et traitement d'une commande
@PostMapping("/api/orders/checkout")
public ResponseEntity<OrderResponse> processOrder(@RequestBody OrderRequest req) {
    try {
        // 1. Vérification atomique des stocks NoSQL
        inventoryService.verifyAvailability(req.getItems());
        
        // 2. Calcul du total avec application des codes promo
        double total = pricingService.calculateTotal(req);
        
        // 3. Création de l'entité commande
        Order newOrder = new Order();
        newOrder.setCustomer(req.getCustomerId());
        newOrder.setTotalAmount(total);
        newOrder.setStatus(OrderStatus.PENDING_KITCHEN);
        
        // 4. Sauvegarde asynchrone et notification au tableau de bord cuisine
        orderRepository.save(newOrder);
        websocketService.notifyKitchen(newOrder);
        
        return ResponseEntity.ok(new OrderResponse("Success", newOrder.getId()));
        
    } catch (OutOfStockException e) {
        return ResponseEntity.status(409).body(new OrderResponse("Erreur : " + e.getMessage()));
    }
}`
      }
    },
    techs: ['Java', 'NoSQL', 'E-commerce', 'Analyse des besoins']
  }
];

// ==========================================
// 2️⃣ TES PASSIONS (PROFIL ANALYTIQUE)
// ==========================================
export const passionsData = [
  {
    id: 'ecriture',
    title: 'Rédaction & Publication',
    color: '#FF4500',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=1000&auto=format&fit=crop',
    subtitle: 'Création Littéraire',
    role: 'Auteur / Romancier',
    context: 'Projets de Romans fictions',
    intro: "L'art de structurer un récit complexe exige la même rigueur analytique que l'ingénierie logicielle.",
    quote: "L'horreur ne naît pas d'une entité divine, mais des failles purement psychologiques de l'esprit humain.",
    genesis: "La création littéraire s'articule pour moi autour d'une exploration profonde et sans concession de la psyché humaine. En focalisant mes projets d'écriture sur les genres exigeants du thriller psychologique et de la Dark Fantasy, je m'efforce de concevoir des récits denses et immersifs. Ma démarche rejette délibérément tout élément mystique pour ancrer la tension dramatique uniquement dans les obsessions et les choix de mes personnages.",
    methodology: "La construction d'un roman de longue haleine demande un travail d'architecture de données narrative en amont. Mon travail actuel se concentre sur un roman retraçant l'évolution d'une jeune ninja nommée Ay. Évoluant au sein d'un univers aux règles structurelles inflexibles, ses dilemmes sont cartographiés de manière chirurgicale. Chaque cause doit engendrer une conséquence logique et inéluctable.",
    metrics: [
      { value: "Ay", label: "Protagoniste (Ninja)" },
      { value: "0", label: "Intervention Divine" },
      { value: "100%", label: "Psychologique" }
    ],
    impact: "Cette pratique quotidienne m'a appris à gérer des projets au long cours, à maintenir une cohérence globale sur des centaines de pages et à accepter la réécriture comme un processus d'optimisation naturel.",
    bridge: "Écrire un roman affine directement mes compétences en conceptualisation. Maîtriser une narration exige une clarté d'expression absolue et une attention méticuleuse portée aux détails. Ces qualités sont indispensables pour structurer des architectures logicielles ou rédiger des documentations techniques irréprochables.",
    keywords: ['Thrillers Psychologiques', 'Dark Fantasy', 'Worldbuilding', 'Analyse Comportementale']
  },
  {
    id: 'sport',
    title: 'Discipline Sportive',
    color: '#0ea5e9',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop',
    subtitle: 'Performance & Planification',
    role: 'Athlète Endurance / Force',
    context: 'Régime d\'Entraînement Strict',
    intro: "La régularité physique et la gestion d'objectifs chiffrés comme leviers de performance cognitive.",
    quote: "La discipline commence exactement là où la motivation s'arrête.",
    genesis: "La pratique sportive de haut volume est le socle de ma discipline personnelle et de ma capacité de concentration. Mon approche du sport refuse le hasard et repose sur une combinaison équilibrée d'endurance, d'explosivité et de renforcement analytique. Cet engagement se traduit par un investissement quotidien dans des disciplines variées.",
    methodology: "Mon entraînement est segmenté de manière rigoureuse entre la technique du Ju-jitsu, des sessions de musculation, complétées par de la course à pied. Pour soutenir ce volume, je déploie une planification nutritionnelle stricte. Cette rigueur se concrétise par la préparation méthodique de courses de fond, où chaque record personnel est l'aboutissement d'une stratégie chiffrée.",
    metrics: [
      { value: "21.1", label: "km (Semi-marathon)" },
      { value: "Amiens", label: "Terrain de course" },
      { value: "4000", label: "Kcal / jour (Optimisation)" }
    ],
    impact: "Le sport m'a forgé un mental résilient face à l'échec. Un mauvais chrono n'est qu'une donnée à analyser pour ajuster le prochain cycle d'entraînement.",
    bridge: "Le parallèle entre la préparation athlétique et le développement informatique est l'optimisation. Gérer sa nutrition ou analyser ses temps au kilomètre relèvent de la même logique de traitement de données. Cette endurance se transpose dans ma capacité à soutenir de longues sessions de debuggage.",
    keywords: ['Ju-jitsu', 'Musculation', 'Semi-Marathon', 'Planification']
  },
  {
    id: 'culture-generale',
    title: 'Culture Générale & Sciences',
    color: '#10b981',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    subtitle: 'Compréhension des Systèmes',
    role: 'Analyste / Observateur',
    context: 'Veille Technologique & Humaine',
    intro: "Analyser l'histoire des civilisations et les algorithmes de demain pour mieux anticiper les besoins technologiques.",
    quote: "Un système d'information n'a de valeur que s'il comprend la psychologie humaine qu'il est censé servir.",
    genesis: "Ma curiosité intellectuelle s'oriente vers la compréhension des structures complexes qui régissent notre monde. Je considère qu'un excellent profil technique ne doit pas s'isoler dans le code, mais doit impérativement assimiler les contextes sociétaux des outils qu'il conçoit.",
    methodology: "Cette démarche s'articule autour de la psychologie, pour appréhender les schémas comportementaux, de l'histoire générale, pour analyser l'évolution des structures, et d'une veille technologique pointue axée sur les avancées de l'Intelligence Artificielle et le traitement de données.",
    metrics: [
      { value: "IA", label: "Modèles prédictifs" },
      { value: "UX", label: "Biais cognitifs" },
      { value: "360°", label: "Vision macro" }
    ],
    impact: "Cette veille constante me permet de ne jamais rester bloqué sur un problème purement technique, en cherchant toujours des solutions dans d'autres disciplines.",
    bridge: "Pour un futur diplômé de la filière MIAGE ou un Consultant SI, la culture générale est un atout stratégique. Elle permet de dialoguer efficacement avec des interlocuteurs variés et de modéliser des systèmes qui répondent à de réelles dynamiques humaines.",
    keywords: ['Psychologie Cognitive', 'Histoire des Structures', 'Veille technologique IA']
  },
  {
    id: 'lectures',
    title: 'Lectures & Imaginaires',
    color: '#f59e0b',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop',
    subtitle: 'Analyse des Structures Graphiques',
    role: 'Lecteur Analytique',
    context: 'Immersion Multiformat',
    intro: "Décortiquer les mécaniques d'engagement et le storytelling visuel à travers la littérature globale.",
    quote: "Chaque case, chaque paragraphe est une ligne de code exécutée par l'imagination du lecteur.",
    genesis: "Ma passion pour la lecture dépasse le simple cadre du divertissement pour devenir une étude systématique de la narration. Qu'il s'agisse de romans de fiction, de bandes dessinées ou de mangas, j'aborde chaque support comme un système logique de gestion du rythme.",
    methodology: "À travers un rythme de lecture soutenu, j'analyse la façon dont les auteurs capturent l'attention. J'étudie l'impact du découpage des scènes, les choix graphiques et les mécaniques d'engagement du public. Cette habitude me permet d'assimiler une grande variété de structures.",
    metrics: [
      { value: "Mangas", label: "Storytelling visuel" },
      { value: "BD", label: "Découpage & Rythme" },
      { value: "Romans", label: "Développement long" }
    ],
    impact: "Cela nourrit considérablement ma créativité visuelle et m'aide à structurer mes propres idées de manière bien plus impactante et mémorable.",
    bridge: "En ingénierie logicielle et en design d'interfaces, le storytelling est crucial. Comprendre comment l'esprit humain traite une succession d'informations me permet de concevoir des parcours utilisateurs fluides, instinctifs et hautement optimisés.",
    keywords: ['Littérature', 'Bandes Dessinées', 'Mangas', 'Storytelling Visuel']
  },
  {
    id: 'modelisation-3d',
    title: 'Modélisation & Arts 3D',
    color: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    subtitle: 'Géométrie & Conception Spatiale',
    role: 'Modeleur 3D Infographiste',
    context: 'Environnement Blender',
    intro: "Manipuler la topologie et sculpter des volumes virtuels en alliant sens esthétique et logique mathématique.",
    quote: "La 3D est l'illusion parfaite née du calcul : là où l'art rencontre la géométrie pure.",
    genesis: "La modélisation en trois dimensions représente pour moi la parfaite convergence entre la sensibilité graphique et la rigueur algorithmique. En explorant la création d'objets dans des environnements virtuels, j'apprends à traduire des concepts abstraits en volumes géométriques complexes.",
    methodology: "Pratiquant en autodidacte sur Blender, je développe mes compétences à travers le pipeline créatif. Mon travail englobe la manipulation des maillages (mesh) pour une topologie propre, la sculpture numérique (sculpting) pour affiner les détails, et le texturing pour un rendu réaliste.",
    metrics: [
      { value: "Mesh", label: "Topologie optimisée" },
      { value: "Sculpt", label: "Détails organiques" },
      { value: "Nodes", label: "Logique procédurale" }
    ],
    impact: "L'apprentissage de la 3D a drastiquement amélioré ma capacité à visualiser des architectures complexes dans l'espace avant même de commencer à les coder.",
    bridge: "L'optimisation des polygones pour le rendu temps réel fait directement écho à l'optimisation des lignes de code et des requêtes SQL : économiser les ressources système tout en maximisant la qualité de l'expérience délivrée à l'utilisateur.",
    keywords: ['Blender 3D', 'Mesh Optimization', 'Digital Sculpting', 'Texturing']
  },
  {
    id: 'aeronautique',
    title: 'Sciences Aéronautiques',
    color: '#ec4899',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop',
    subtitle: 'Rigueur & Systèmes Complexes',
    role: 'Titulaire du B.I.A.',
    context: 'Validation Théorique',
    intro: "Assimiler les lois de la physique et des réglementations strictes pour appréhender les environnements à haute responsabilité.",
    quote: "En vol comme en architecture logicielle, le hasard n'a pas sa place : seule l'anticipation garantit la sécurité.",
    genesis: "Mon attrait pour l'aéronautique est guidé par une fascination pour l'ingénierie de pointe et la gestion de protocoles complexes où la marge d'erreur est inexistante. L'obtention de mon BIA a formalisé cette passion.",
    methodology: "Ma formation a couvert des pans entiers de l'ingénierie. J'ai validé des compétences en mécanique des fluides, analyse des prévisions météorologiques, et étude des réglementations de vol. Cette étude impose une structure d'esprit orientée vers la gestion du risque.",
    metrics: [
      { value: "B.I.A.", label: "Brevet d'Initiation" },
      { value: "0", label: "Marge d'erreur" },
      { value: "100%", label: "Respect des protocoles" }
    ],
    impact: "Cette approche m'a inculqué la culture du 'fail-safe' : toujours concevoir des systèmes avec des plans de secours et des vérifications redondantes.",
    bridge: "L'aéronautique est l'école ultime de la rigueur systémique. Qu'il s'agisse de vérifier une check-list avant un vol ou de concevoir une base de données, la méthodologie reste identique : suivre des protocoles stricts, anticiper les pannes et concevoir des systèmes tolérants aux failles.",
    keywords: ['Mécanique des Fluides', 'Météorologie', 'Réglementation Aérienne', 'Rigueur Système']
  }
];

// ==========================================
// 3️⃣ DONNÉES DU LAB (Galerie de preuves visuelles de la page d'accueil)
// ==========================================
export const labData = [
  {
    id: "blender-art",
    title: "MODÉLISATION_3D",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800"
  },
  {
    id: "figma-ui",
    title: "PROTOTYPAGE_UI",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800"
  },
  {
    id: "db-schema",
    title: "ARCHITECTURE_BDD",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800"
  }
];
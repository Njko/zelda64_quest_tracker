/*
 * Données du carnet — The Legend of Zelda: Ocarina of Time (N64).
 *
 * PHASES : les grandes étapes de l'histoire, dans l'ordre.
 * QUESTS : chaque quête possède
 *   id      identifiant stable (sert de clé dans le stockage local — ne pas renommer)
 *   title   nom affiché
 *   cat     "main" (histoire) | "song" (chant) | "gear" (équipement) | "side" (quête annexe) | "mini" (mini-jeu)
 *   age     "child" | "adult" | "both"
 *   from    index de la phase à partir de laquelle la quête devient faisable
 *   best    index de la phase où il est conseillé de la terminer
 *   key     true si la quête est indispensable (ou presque) pour finir le jeu
 *   reward  récompense
 *   needs   conditions à remplir avant de commencer
 *   steps   étapes à cocher
 *   when    pourquoi la faire à ce moment-là
 *   tip     astuce facultative
 */

const PHASES = [
  {
    id: "e1", age: "child", title: "Forêt Kokiri & Arbre Mojo",
    goal: "Trouver une épée et un bouclier, puis entrer dans l'Arbre Mojo.",
    advice: "Rien ne presse ici : explore le village, ramasse des rubis (il t'en faut 40 pour le bouclier) et parle à tout le monde."
  },
  {
    id: "e2", age: "child", title: "Plaine, Bourg & Château d'Hyrule",
    goal: "Rejoindre le château et rencontrer la princesse Zelda.",
    advice: "Le jeu t'envoie droit au château, puis droit au Mont du Péril. C'est pourtant ici que s'ouvrent le plus de quêtes annexes : Ranch Lon Lon, Bois Perdus, mini-jeux du Bourg. Prends le temps de faire le tour avant de grimper."
  },
  {
    id: "e3", age: "child", title: "Cocorico & Mont du Péril",
    goal: "Obtenir le Rubis Goron dans la Caverne Dodongo.",
    advice: "Les bombes obtenues dans la Caverne Dodongo ouvrent beaucoup de portes (Grandes Fées, bowling teigneux, Rivière Zora). Fais le tour de Cocorico avant de monter, puis repasse par les lieux déjà visités avec tes bombes."
  },
  {
    id: "e4", age: "child", title: "Domaine Zora & Jabu-Jabu",
    goal: "Obtenir le Saphir Zora dans le ventre de Jabu-Jabu.",
    advice: "Dernière ligne droite de l'enfance. Le boomerang obtenu ici aide à attraper des Skulltulas d'or hors de portée."
  },
  {
    id: "e5", age: "child", title: "Ocarina du Temps & Temple du Temps",
    goal: "Récupérer l'Ocarina du Temps et retirer l'Épée de Légende.",
    advice: "Le grand piège du jeu : dès que tu as les trois pierres, tout te pousse vers le Temple du Temps. Fais d'abord le bilan de l'enfance. Rien n'est perdu pour autant : une fois adulte, tu peux redevenir enfant en reposant l'épée sur son socle."
  },
  {
    id: "a1", age: "adult", title: "Sept ans plus tard",
    goal: "Obtenir le Grappin à Cocorico.",
    advice: "Avant de foncer vers le premier temple, équipe-toi : Grappin, Epona et Chant des Tempêtes changent tout le reste de l'aventure."
  },
  {
    id: "a2", age: "adult", title: "Temple de la Forêt",
    goal: "Obtenir le Médaillon de la Forêt.",
    advice: "L'Arc des Fées trouvé dans ce temple débloque le stand de tir de Cocorico et la chasse aux Grands Esprits."
  },
  {
    id: "a3", age: "adult", title: "Temple du Feu",
    goal: "Obtenir le Médaillon du Feu.",
    advice: "La Masse des Titans ouvre l'accès à une Grande Fée dans le cratère : ne quitte pas la montagne sans y passer."
  },
  {
    id: "a4", age: "adult", title: "Caverne Polaire & Temple de l'Eau",
    goal: "Obtenir le Médaillon de l'Eau.",
    advice: "Emporte un maximum de bouteilles dans la Caverne Polaire pour le feu bleu. C'est aussi le meilleur moment pour l'Épée Biggoron, qui passe par le roi Zora et le Lac Hylia."
  },
  {
    id: "a5", age: "adult", title: "Puits de Cocorico & Temple de l'Ombre",
    goal: "Obtenir le Médaillon de l'Ombre.",
    advice: "Cette étape t'oblige à redevenir enfant pour le Puits. Profites-en pour solder tout ce qu'il te reste à faire enfant en un seul voyage."
  },
  {
    id: "a6", age: "adult", title: "Forteresse Gerudo & Temple de l'Esprit",
    goal: "Obtenir le Médaillon de l'Esprit.",
    advice: "Le temple se fait en deux fois (enfant puis adulte). La Carte Gerudo ouvre aussi le tir à l'arc à cheval et le Gymnase Gerudo."
  },
  {
    id: "a7", age: "adult", title: "Château de Ganon",
    goal: "Vaincre Ganon.",
    advice: "Point de non-retour émotionnel, mais pas technique : tu peux ressortir du château à tout moment. Termine ce qui te tient à cœur avant de monter dans la tour."
  }
];

const QUESTS = [
  /* ───────────── HISTOIRE ───────────── */
  {
    id: "m-e1", title: "L'Arbre Mojo", cat: "main", age: "child", from: 0, best: 0, key: true,
    reward: "Émeraude Kokiri, Lance-pierre, Ocarina des Fées",
    needs: ["Aucune : c'est le début du jeu."],
    steps: [
      "Trouver l'Épée Kokiri : passer par le petit tunnel au-dessus du terrain d'entraînement, éviter le rocher qui roule, ouvrir le coffre.",
      "Réunir 40 rubis et acheter le Bouclier Mojo à la boutique.",
      "Montrer épée et bouclier à Mido pour qu'il libère le passage.",
      "Dans l'Arbre Mojo, obtenir le Lance-pierre.",
      "Vaincre Gohma et recevoir l'Émeraude Kokiri.",
      "En quittant la forêt, recevoir l'Ocarina des Fées des mains de Saria sur le pont."
    ],
    when: "Première étape obligatoire. Fouille l'herbe et les rochers du village pour les rubis."
  },
  {
    id: "m-e2", title: "Rencontrer la princesse Zelda", cat: "main", age: "child", from: 1, best: 1, key: true,
    reward: "Lettre de Zelda, Berceuse de Zelda",
    needs: ["Avoir terminé l'Arbre Mojo."],
    steps: [
      "Traverser la Plaine d'Hyrule jusqu'au Bourg (le pont-levis est fermé la nuit).",
      "Parler à Malon sur la place du Bourg.",
      "Retrouver Malon près des lianes à l'entrée du château : elle donne l'Œuf.",
      "Attendre l'aube pour que l'œuf éclose en Cocotte.",
      "Se faufiler entre les gardes, puis réveiller Talon avec la Cocotte.",
      "Pousser les caisses dans la douve, sauter et passer par le petit conduit.",
      "Traverser la cour sans se faire voir et rencontrer Zelda : elle donne sa Lettre.",
      "Apprendre la Berceuse de Zelda auprès d'Impa."
    ],
    when: "Étape obligatoire. Une fois Talon réveillé, il rentre au Ranch Lon Lon : plusieurs quêtes s'y ouvrent."
  },
  {
    id: "m-e3", title: "La Caverne Dodongo", cat: "main", age: "child", from: 2, best: 2, key: true,
    reward: "Rubis Goron, Bracelet Goron, Sac de bombes, Magie",
    needs: ["Lettre de Zelda.", "Chant de Saria (sans lui, Darunia ne te donnera rien).", "Berceuse de Zelda."],
    steps: [
      "À Cocorico, montrer la Lettre de Zelda au garde du portail.",
      "Grimper le sentier du Mont du Péril jusqu'au Village Goron.",
      "Jouer la Berceuse de Zelda devant la porte de Darunia, tout en bas du village.",
      "Jouer le Chant de Saria à Darunia : il donne le Bracelet Goron.",
      "Avec une fleur-bombe, ouvrir l'entrée de la Caverne Dodongo.",
      "Dans la caverne, obtenir le Sac de bombes.",
      "Vaincre le Roi Dodongo et recevoir le Rubis Goron.",
      "Monter au sommet de la montagne, exploser la paroi et jouer la Berceuse à la Grande Fée : elle donne la magie et l'attaque cyclone chargée."
    ],
    when: "Étape obligatoire. Avant de monter, prends le Bouclier Hylien : il protège des chutes de pierres si tu t'accroupis dessous.",
    tip: "La Grande Fée du sommet est indispensable : sans jauge de magie, impossible d'utiliser le Feu de Din ou le Monocle de Vérité plus tard."
  },
  {
    id: "m-e4", title: "Le ventre de Jabu-Jabu", cat: "main", age: "child", from: 3, best: 3, key: true,
    reward: "Saphir Zora, Écaille d'argent, Boomerang, une bouteille",
    needs: ["Bombes (pour dégager l'entrée de la Rivière Zora).", "Berceuse de Zelda."],
    steps: [
      "Remonter la Rivière Zora jusqu'à la cascade et jouer la Berceuse de Zelda sur la plaque.",
      "Au Domaine Zora, gagner le jeu du plongeon (20 rubis) : Écaille d'argent.",
      "Plonger dans le tunnel du domaine pour rejoindre le Lac Hylia.",
      "Au fond du lac, ramasser la bouteille contenant la Lettre de Ruto.",
      "Montrer la lettre au roi Zora : il libère le passage (et tu gardes la bouteille).",
      "Attraper un poisson dans la bouteille et le déposer devant Jabu-Jabu.",
      "Dans Jabu-Jabu, obtenir le Boomerang.",
      "Vaincre Barinade et recevoir le Saphir Zora."
    ],
    when: "Étape obligatoire. La bouteille de la lettre est l'une des quatre du jeu : elle ne peut pas être manquée."
  },
  {
    id: "m-e5", title: "L'Épée de Légende", cat: "main", age: "child", from: 4, best: 4, key: true,
    reward: "Ocarina du Temps, Chant du Temps, Épée de Légende",
    needs: ["Les trois Pierres Ancestrales (Émeraude, Rubis, Saphir)."],
    steps: [
      "Revenir au Bourg d'Hyrule : Zelda et Impa s'enfuient à cheval.",
      "Ramasser l'Ocarina du Temps dans la douve.",
      "Apprendre le Chant du Temps (vision de Zelda).",
      "Au Temple du Temps, jouer le Chant du Temps devant l'autel.",
      "Retirer l'Épée de Légende."
    ],
    when: "Avant de retirer l'épée, vérifie la liste « En retard » ci-dessus : c'est le moment de tout solder côté enfant.",
    tip: "Rien n'est définitivement manqué : adulte, repose l'épée sur son socle pour redevenir enfant, autant de fois que tu veux."
  },
  {
    id: "m-a1", title: "Le Grappin", cat: "main", age: "adult", from: 5, best: 5, key: true,
    reward: "Grappin",
    needs: ["Être adulte."],
    steps: [
      "Écouter Sheik au Temple du Temps.",
      "Au cimetière de Cocorico, tirer la tombe marquée de fleurs près de la cabane du fossoyeur.",
      "Suivre le fantôme d'Igor (Dampé) à la course jusqu'au bout : il donne le Grappin."
    ],
    when: "Tout premier objectif d'adulte : le Grappin est nécessaire pour entrer dans le Temple de la Forêt."
  },
  {
    id: "m-a2", title: "Le Temple de la Forêt", cat: "main", age: "adult", from: 6, best: 6, key: true,
    reward: "Médaillon de la Forêt, Arc des Fées, Menuet des Bois, Prélude de la Lumière",
    needs: ["Grappin.", "Chant de Saria (conseillé pour s'orienter dans les Bois Perdus)."],
    steps: [
      "Traverser les Bois Perdus jusqu'au Bosquet Sacré (Mido laisse passer si tu joues le Chant de Saria).",
      "Apprendre le Menuet des Bois auprès de Sheik.",
      "Entrer dans le temple avec le Grappin.",
      "Obtenir l'Arc des Fées.",
      "Vaincre Ganon Spectral et recevoir le Médaillon de la Forêt.",
      "Retourner au Temple du Temps : Sheik enseigne le Prélude de la Lumière."
    ],
    when: "Premier temple adulte. Le Prélude de la Lumière te ramène ensuite au Temple du Temps d'un coup d'ocarina : très pratique pour les allers-retours enfant/adulte."
  },
  {
    id: "m-a3", title: "Le Temple du Feu", cat: "main", age: "adult", from: 7, best: 7, key: true,
    reward: "Médaillon du Feu, Tunique Goron, Masse des Titans, Boléro du Feu",
    needs: ["Bombes.", "Grappin."],
    steps: [
      "Au Village Goron, arrêter le Goron qui roule avec une bombe : il donne la Tunique Goron.",
      "Dans la salle de Darunia, tirer la statue pour ouvrir le passage vers le cratère.",
      "Dans le cratère, franchir le pont cassé au Grappin : Sheik enseigne le Boléro du Feu.",
      "Dans le temple, obtenir la Masse des Titans.",
      "Vaincre Volcania et recevoir le Médaillon du Feu."
    ],
    when: "Équipe la Tunique Goron avant d'entrer dans le cratère, sinon un compte à rebours te tue."
  },
  {
    id: "m-a4", title: "Caverne Polaire & Temple de l'Eau", cat: "main", age: "adult", from: 8, best: 8, key: true,
    reward: "Médaillon de l'Eau, Bottes de plomb, Tunique Zora, Super Grappin, Sérénade de l'Eau",
    needs: ["Au moins une bouteille vide (deux ou trois, c'est mieux).", "Grappin."],
    steps: [
      "Traverser le Domaine Zora gelé jusqu'à la Fontaine Zora.",
      "Rejoindre la Caverne Polaire en sautant sur les blocs de glace.",
      "Remplir ses bouteilles de feu bleu.",
      "Obtenir les Bottes de plomb, puis apprendre la Sérénade de l'Eau auprès de Sheik.",
      "Dégeler le roi Zora avec du feu bleu : il donne la Tunique Zora.",
      "Au Lac Hylia, entrer dans le Temple de l'Eau (bottes de plomb + grappin).",
      "Obtenir le Super Grappin.",
      "Vaincre Morpha et recevoir le Médaillon de l'Eau."
    ],
    when: "Garde une bouteille de feu bleu en réserve après la caverne : elle sert pour le roi Zora.",
    tip: "Si tu n'as plus de feu bleu, la tunique s'achète aussi à la boutique Zora, mais elle coûte cher."
  },
  {
    id: "m-a5", title: "Le Puits et le Temple de l'Ombre", cat: "main", age: "both", from: 9, best: 9, key: true,
    reward: "Médaillon de l'Ombre, Monocle de Vérité, Bottes des airs, Nocturne de l'Ombre",
    needs: [
      "Médaillons de la Forêt, du Feu et de l'Eau.",
      "Chant des Tempêtes.",
      "Feu de Din et jauge de magie.",
      "Super Grappin."
    ],
    steps: [
      "Entrer à Cocorico avec les trois médaillons : Sheik enseigne le Nocturne de l'Ombre.",
      "Redevenir enfant au Temple du Temps.",
      "Enfant, jouer le Chant des Tempêtes dans le moulin de Cocorico : le puits se vide.",
      "Explorer le Puits et obtenir le Monocle de Vérité.",
      "Redevenir adulte et jouer le Nocturne de l'Ombre.",
      "Allumer toutes les torches d'un coup avec le Feu de Din pour ouvrir le temple.",
      "Dans le temple, obtenir les Bottes des airs.",
      "Vaincre Bongo Bongo et recevoir le Médaillon de l'Ombre."
    ],
    when: "Le voyage enfant est obligatoire ici : regroupe-le avec les autres quêtes marquées « Retour enfant ».",
    tip: "Le Puits peut se faire bien plus tôt, dès que tu connais le Chant des Tempêtes : le Monocle rend la chasse au trésor du Bourg triviale."
  },
  {
    id: "m-a6", title: "Le Temple de l'Esprit", cat: "main", age: "both", from: 10, best: 10, key: true,
    reward: "Médaillon de l'Esprit, Carte Gerudo, Gantelets d'argent, Bouclier Miroir, Requiem des Esprits",
    needs: ["Epona ou Super Grappin (pour franchir le pont de la Vallée Gerudo).", "Monocle de Vérité.", "Super Grappin ou Bottes des airs (rivière de sable)."],
    steps: [
      "Franchir le pont cassé de la Vallée Gerudo.",
      "Se laisser capturer à la Forteresse, puis libérer les quatre charpentiers : Carte Gerudo.",
      "Traverser le Désert Hanté : suivre les drapeaux, puis le guide fantôme visible au Monocle.",
      "Au Colosse du Désert, entrer dans le temple et en ressortir : Sheik enseigne le Requiem des Esprits.",
      "Redevenir enfant, jouer le Requiem et faire la première moitié du temple : Gantelets d'argent.",
      "Redevenir adulte et faire la seconde moitié : Bouclier Miroir.",
      "Vaincre Twinrova et recevoir le Médaillon de l'Esprit."
    ],
    when: "Second voyage enfant obligatoire. Enfant, tu peux aussi planter un haricot magique devant le temple."
  },
  {
    id: "m-a7", title: "Le Château de Ganon", cat: "main", age: "adult", from: 11, best: 11, key: true,
    reward: "Flèches de Lumière, Gantelets d'or, fin du jeu",
    needs: ["Les six médaillons.", "Jauge de magie bien remplie (potions vertes conseillées)."],
    steps: [
      "Aller au Temple du Temps : Sheik se révèle et donne les Flèches de Lumière.",
      "Traverser le pont arc-en-ciel vers le château.",
      "Briser les six barrières (une épreuve par médaillon).",
      "Récupérer les Gantelets d'or dans l'épreuve de l'Ombre.",
      "Gravir la tour et vaincre Ganondorf.",
      "S'échapper du château, puis vaincre Ganon."
    ],
    when: "Fais le plein de fées en bouteille et de potions avant de monter dans la tour."
  },

  /* ───────────── ENFANT : dès la sortie de la forêt ───────────── */
  {
    id: "chant-saria", title: "Chant de Saria", cat: "song", age: "child", from: 1, best: 1, key: true,
    reward: "Chant de Saria",
    needs: ["Ocarina des Fées (reçue en quittant la forêt)."],
    steps: [
      "Retourner à la Forêt Kokiri et entrer dans les Bois Perdus.",
      "Suivre la musique d'écran en écran jusqu'au Bosquet Sacré.",
      "Traverser le labyrinthe et rejoindre Saria devant le temple : elle enseigne son chant."
    ],
    when: "À faire avant le Mont du Péril : Darunia ne donne le Bracelet Goron que si tu lui joues ce chant. Le jeu ne le dit pas clairement.",
    tip: "Si la musique s'arrête, tu as pris le mauvais tunnel."
  },
  {
    id: "chant-epona", title: "Chant d'Epona", cat: "song", age: "child", from: 1, best: 1, key: true,
    reward: "Chant d'Epona",
    needs: ["Avoir réveillé Talon devant le château (il doit être rentré au ranch).", "Ocarina."],
    steps: [
      "Aller au Ranch Lon Lon, au centre de la Plaine d'Hyrule.",
      "Parler à Malon dans l'enclos, plusieurs fois si nécessaire.",
      "Sortir l'ocarina devant elle : elle enseigne le Chant d'Epona."
    ],
    when: "À faire enfant, juste après le château. Sans ce chant, impossible d'obtenir Epona une fois adulte.",
    tip: "Jouer le chant devant une vache donne du Lait Lon Lon (bouteille vide requise)."
  },
  {
    id: "bouteille-talon", title: "Les super cocottes de Talon", cat: "mini", age: "child", from: 1, best: 1,
    reward: "Bouteille (remplie de lait)",
    needs: ["Avoir réveillé Talon devant le château.", "10 rubis par essai."],
    steps: [
      "Au Ranch Lon Lon, entrer dans la maison et parler à Talon.",
      "Retrouver les 3 super cocottes parmi les autres en 30 secondes."
    ],
    when: "Le plus tôt possible : c'est la première bouteille accessible, et les bouteilles servent tout au long du jeu (fées, potions, feu bleu, insectes).",
    tip: "Rassemble d'abord les cocottes ordinaires dans un coin : les trois lâchées par Talon seront plus faciles à repérer."
  },
  {
    id: "chien-richard", title: "Le petit chien de la dame", cat: "side", age: "child", from: 1, best: 1,
    reward: "Quart de cœur",
    needs: ["Être au Bourg d'Hyrule de nuit."],
    steps: [
      "De nuit, trouver le petit chien blanc sur la place du Bourg : il se met à te suivre.",
      "L'amener à la dame dans la maison de la ruelle arrière."
    ],
    when: "À faire en passant, lors d'une nuit au Bourg."
  },
  {
    id: "tir-bourg", title: "Stand de tir du Bourg", cat: "mini", age: "child", from: 1, best: 1,
    reward: "Sac de graines Mojo plus grand",
    needs: ["Lance-pierre.", "20 rubis par essai."],
    steps: ["Toucher toutes les cibles (les rubis) sans en manquer une seule."],
    when: "Utile mais pas urgent : plus de munitions pour le lance-pierre."
  },
  {
    id: "cible-bois", title: "La cible des Bois Perdus", cat: "mini", age: "child", from: 1, best: 1,
    reward: "Sac de graines Mojo plus grand",
    needs: ["Lance-pierre."],
    steps: [
      "Dans les Bois Perdus, trouver la cible suspendue au-dessus d'une plate-forme.",
      "Toucher le centre de la cible trois fois de suite."
    ],
    when: "À faire lors du passage dans les Bois Perdus pour le Chant de Saria."
  },
  {
    id: "skullkid-saria", title: "L'ami du Skull Kid", cat: "side", age: "child", from: 1, best: 1,
    reward: "Quart de cœur",
    needs: ["Chant de Saria."],
    steps: [
      "Dans les Bois Perdus, prendre à gauche dès l'entrée : un Skull Kid joue sur une souche.",
      "Monter sur la souche en face et jouer le Chant de Saria."
    ],
    when: "Juste après avoir appris le Chant de Saria, puisque tu es sur place."
  },
  {
    id: "skullkid-memoire", title: "Le jeu de mémoire des Skull Kids", cat: "mini", age: "child", from: 1, best: 1,
    reward: "Quart de cœur",
    needs: ["Ocarina."],
    steps: [
      "Dans les Bois Perdus, trouver les deux Skull Kids sur leurs souches (à droite depuis l'entrée, puis descendre).",
      "Sortir l'ocarina sur la souche basse et répéter leurs notes.",
      "Réussir trois manches de suite."
    ],
    when: "À faire lors du passage dans les Bois Perdus."
  },
  {
    id: "epouvantail", title: "Le chant de l'épouvantail", cat: "side", age: "both", from: 1, best: 4,
    reward: "Chant de l'épouvantail (fait apparaître Pierre, point d'ancrage pour le grappin)",
    needs: ["Ocarina.", "Pour finir : être adulte."],
    steps: [
      "Enfant, au Lac Hylia, parler à l'épouvantail Bonooru avec l'ocarina sortie.",
      "Lui jouer une mélodie de 8 notes de ton invention (note-la quelque part !).",
      "Adulte, revenir lui jouer la même mélodie : le chant est enregistré."
    ],
    when: "La partie enfant doit être faite avant de retirer l'Épée de Légende, sinon il faudra revenir. Le chant ouvre des raccourcis et l'accès à quelques Skulltulas et quarts de cœur.",
    tip: "Choisis une mélodie simple qui n'est pas uniquement une note répétée."
  },
  {
    id: "peche-enfant", title: "Partie de pêche (enfant)", cat: "mini", age: "child", from: 1, best: 3,
    reward: "Quart de cœur",
    needs: ["20 rubis."],
    steps: [
      "Au Lac Hylia, entrer dans l'étang de pêche.",
      "Attraper un gros poisson (environ 10 livres) et le montrer au patron."
    ],
    when: "Lors du passage au Lac Hylia pour la Lettre de Ruto.",
    tip: "Les gros poissons se tiennent près des nénuphars et du tronc immergé."
  },

  /* ───────────── ENFANT : Cocorico & Mont du Péril ───────────── */
  {
    id: "bouclier-hylien", title: "Bouclier Hylien", cat: "gear", age: "child", from: 1, best: 2,
    reward: "Bouclier Hylien",
    needs: ["80 rubis, ou accès au cimetière de Cocorico."],
    steps: [
      "Soit l'acheter au Bazar du Bourg (80 rubis).",
      "Soit, gratuitement : au cimetière de Cocorico, tirer les tombes jusqu'à trouver celle qui cache un coffre."
    ],
    when: "Avant de grimper le Mont du Péril : il protège des chutes de pierres, et il ne brûle pas comme le Bouclier Mojo.",
    tip: "Il suffit de faire l'une des deux étapes : coche la quête directement."
  },
  {
    id: "cocottes-anju", title: "Les cocottes d'Anju", cat: "side", age: "child", from: 2, best: 2,
    reward: "Bouteille",
    needs: ["Être à Cocorico de jour."],
    steps: [
      "Parler à la jeune femme près de l'enclos.",
      "Ramener les 7 cocottes éparpillées dans le village dans l'enclos."
    ],
    when: "Dès l'arrivée à Cocorico : c'est une bouteille, donc prioritaire.",
    tip: "Certaines cocottes sont derrière des barrières : saute depuis une hauteur en tenant une cocotte pour planer."
  },
  {
    id: "chant-soleil", title: "Chant du Soleil", cat: "song", age: "child", from: 2, best: 2,
    reward: "Chant du Soleil (passe du jour à la nuit, paralyse les Effrois)",
    needs: ["Berceuse de Zelda."],
    steps: [
      "Au fond du cimetière de Cocorico, se placer sur la marque de la Triforce devant la grande tombe.",
      "Jouer la Berceuse de Zelda : la tombe s'ouvre.",
      "Traverser le caveau et lire l'inscription au fond."
    ],
    when: "Très tôt : beaucoup de quêtes dépendent de l'heure (Skulltulas d'or la nuit, boutiques le jour). Ce chant t'évite d'attendre."
  },
  {
    id: "fossoyeur", title: "La tournée du fossoyeur", cat: "mini", age: "child", from: 2, best: 2,
    reward: "Quart de cœur",
    needs: ["Être au cimetière en début de nuit.", "10 rubis par coup de pelle."],
    steps: [
      "En début de soirée, parler à Igor le fossoyeur qui arpente le cimetière.",
      "Le faire creuser jusqu'à ce qu'il déterre le quart de cœur (l'emplacement est aléatoire)."
    ],
    when: "Uniquement enfant. À faire lors du passage à Cocorico, avec quelques dizaines de rubis en poche."
  },
  {
    id: "masques", title: "La Foire aux Masques", cat: "side", age: "child", from: 2, best: 4,
    reward: "Masque de Vérité (fait parler les Pierres à Potins), rubis",
    needs: [
      "Avoir montré la Lettre de Zelda au garde du portail de Cocorico.",
      "Pour le dernier masque : les trois Pierres Ancestrales."
    ],
    steps: [
      "Emprunter le Masque du Renard à la Foire aux Masques (Bourg) et le vendre au garde du portail de Cocorico.",
      "Rembourser la boutique, puis vendre le Masque de Mort au Skull Kid des Bois Perdus (à gauche dès l'entrée).",
      "Rembourser, puis vendre le Masque d'Effroi au garçon du cimetière de Cocorico (de jour).",
      "Rembourser, puis vendre le Masque du Lapin au marathonien qui court dans la Plaine d'Hyrule (il n'apparaît qu'une fois les trois pierres obtenues).",
      "Rembourser : le Masque de Vérité est désormais prêtable.",
      "Bonus : porter les masques devant les pestes Mojo du théâtre caché des Bois Perdus pour des améliorations de bâtons et de noix Mojo."
    ],
    when: "Commence dès le Mont du Péril et avance au fil de l'histoire. Le dernier masque ne peut se vendre qu'entre l'obtention des trois pierres et le retrait de l'Épée de Légende (ou lors d'un retour enfant).",
    tip: "Le marathonien remplit ta bourse au maximum : dépense tes rubis avant de lui vendre le masque."
  },
  {
    id: "fee-din", title: "Grande Fée : Feu de Din", cat: "gear", age: "child", from: 2, best: 2, key: true,
    reward: "Feu de Din",
    needs: ["Bombes.", "Berceuse de Zelda.", "Jauge de magie (Grande Fée du sommet du Mont du Péril)."],
    steps: [
      "Retourner sur le chemin du Château d'Hyrule.",
      "Après les lianes, suivre la route jusqu'au cul-de-sac et exploser le rocher qui bouche l'entrée.",
      "Jouer la Berceuse de Zelda sur la Triforce."
    ],
    when: "Dès que tu as les bombes. Le Feu de Din est indispensable pour ouvrir le Temple de l'Ombre, et la fontaine n'est accessible qu'enfant.",
    tip: "Si tu l'as oublié, il faudra redevenir enfant : le château n'existe plus sept ans plus tard."
  },
  {
    id: "sac-bombes-goron", title: "Le Goron qui roule", cat: "gear", age: "child", from: 2, best: 2,
    reward: "Sac de bombes plus grand",
    needs: ["Bombes."],
    steps: [
      "Au Village Goron, se poster sur le trajet du gros Goron qui roule autour de l'étage.",
      "L'arrêter en faisant exploser une bombe sur son passage."
    ],
    when: "Juste après la Caverne Dodongo, tant que tu es sur place."
  },
  {
    id: "bowling", title: "Bowling teigneux", cat: "mini", age: "child", from: 2, best: 3,
    reward: "Quart de cœur, Sac de bombes plus grand",
    needs: ["Sac de bombes.", "30 rubis par partie."],
    steps: [
      "Au Bourg d'Hyrule, entrer au bowling teigneux (ouvert de jour).",
      "Gagner le quart de cœur.",
      "Gagner le sac de bombes plus grand."
    ],
    when: "Après la Caverne Dodongo. Les lots tournent : rejoue jusqu'à obtenir les deux."
  },

  /* ───────────── ENFANT : Zora & bilan ───────────── */
  {
    id: "haricots", title: "Les haricots magiques", cat: "side", age: "both", from: 3, best: 4,
    reward: "Plates-formes volantes une fois adulte (quarts de cœur, Skulltulas, raccourcis)",
    needs: ["Bombes (accès à la Rivière Zora).", "Beaucoup de rubis : le prix augmente à chaque haricot (de 10 à 100)."],
    steps: [
      "Acheter les haricots au vendeur assis au bord de la Rivière Zora.",
      "Planter : Rivière Zora (à côté du vendeur).",
      "Planter : Forêt Kokiri (près de la boutique).",
      "Planter : Bois Perdus (deux emplacements).",
      "Planter : cimetière de Cocorico.",
      "Planter : sentier du Mont du Péril (devant la Caverne Dodongo).",
      "Planter : Lac Hylia (près du laboratoire).",
      "Planter : Vallée Gerudo (au bord de la rivière, en bas).",
      "Planter (retour enfant) : Cratère du Péril, accessible avec le Boléro du Feu.",
      "Planter (retour enfant) : Colosse du Désert, accessible avec le Requiem des Esprits."
    ],
    when: "À planter enfant pour en profiter adulte. Fais les huit premiers avant de retirer l'Épée de Légende ; les deux derniers attendront un retour enfant.",
    tip: "Chaque carré de terre meuble cache aussi une Skulltula d'or : verse des insectes en bouteille dessus."
  },
  {
    id: "fee-farore", title: "Grande Fée : Vent de Farore", cat: "gear", age: "child", from: 3, best: 3,
    reward: "Vent de Farore (point de téléportation dans les donjons)",
    needs: ["Bombes.", "Berceuse de Zelda.", "Accès à la Fontaine Zora (le roi Zora doit avoir libéré le passage)."],
    steps: [
      "À la Fontaine Zora, longer la rive jusqu'au renfoncement et exploser la paroi.",
      "Jouer la Berceuse de Zelda sur la Triforce."
    ],
    when: "En passant, juste avant ou après Jabu-Jabu. Facultatif mais confortable dans les grands temples."
  },
  {
    id: "chasse-tresor", title: "Chasse au trésor du Bourg", cat: "mini", age: "child", from: 1, best: 9,
    reward: "Quart de cœur",
    needs: ["Être au Bourg de nuit.", "10 rubis.", "Monocle de Vérité (fortement conseillé)."],
    steps: [
      "De nuit, entrer dans la boutique de la chasse au trésor.",
      "Dans chaque salle, utiliser le Monocle pour voir quel coffre contient la clé.",
      "Ouvrir le dernier coffre."
    ],
    when: "Sans le Monocle, c'est du pur hasard (1 chance sur 32). Attends le voyage enfant du Puits et fais-la juste après.",
    tip: "C'est l'exemple type de quête où il vaut mieux patienter."
  },
  {
    id: "grenouilles", title: "Les grenouilles mélomanes", cat: "side", age: "child", from: 3, best: 9,
    reward: "2 quarts de cœur, rubis",
    needs: ["Chant des Tempêtes (appris adulte) pour le premier quart de cœur.", "Tous les chants non téléporteurs pour le second."],
    steps: [
      "Enfant, à la Rivière Zora, monter sur la souche devant les grenouilles et sortir l'ocarina.",
      "Jouer le Chant des Tempêtes : premier quart de cœur.",
      "Jouer la Berceuse de Zelda, le Chant d'Epona, de Saria, du Soleil et du Temps (un rubis à chaque fois).",
      "Réussir ensuite le jeu des papillons (les grenouilles sautent, tu joues la note correspondante) : second quart de cœur."
    ],
    when: "Impossible à finir avant d'être adulte : le Chant des Tempêtes s'apprend au moulin sept ans plus tard. À regrouper avec le voyage enfant du Puits."
  },

  /* ───────────── ADULTE ───────────── */
  {
    id: "epona", title: "Epona", cat: "side", age: "adult", from: 5, best: 5,
    reward: "Epona",
    needs: ["Chant d'Epona (appris enfant).", "Environ 70 rubis."],
    steps: [
      "Au Ranch Lon Lon, payer Ingo (10 rubis) pour monter à cheval.",
      "Jouer le Chant d'Epona pour appeler Epona, puis la monter.",
      "Toujours en selle, parler à Ingo et accepter la course (50 rubis).",
      "Gagner la première course, puis la revanche.",
      "Ingo ferme le portail : sauter par-dessus la barrière du ranch."
    ],
    when: "Dès que tu es adulte. Epona rend les traversées de la plaine bien plus rapides et sert pour l'Épée Biggoron, les Grands Esprits et la Vallée Gerudo.",
    tip: "Ne gaspille pas les carottes dans les virages ; garde-en une pour chaque ligne droite."
  },
  {
    id: "chant-tempetes", title: "Chant des Tempêtes", cat: "song", age: "adult", from: 5, best: 5, key: true,
    reward: "Chant des Tempêtes",
    needs: ["Être adulte.", "Ocarina."],
    steps: [
      "Entrer dans le moulin de Cocorico.",
      "Sortir l'ocarina devant le joueur d'orgue de Barbarie en colère."
    ],
    when: "Dès le premier passage adulte à Cocorico (tu y es déjà pour le Grappin). Indispensable pour vider le Puits, et il ouvre de nombreuses grottes cachées.",
    tip: "Le jeu ne t'y envoie qu'avant le Temple de l'Ombre, mais rien n'empêche de l'apprendre tout de suite."
  },
  {
    id: "course-igor", title: "Battre le fantôme d'Igor", cat: "mini", age: "adult", from: 5, best: 5,
    reward: "Quart de cœur",
    needs: ["Avoir déjà obtenu le Grappin."],
    steps: [
      "Redescendre dans la tombe d'Igor au cimetière.",
      "Finir la course en moins d'une minute."
    ],
    when: "Tant que tu es au cimetière. Sinon, n'importe quand.",
    tip: "Les flammes qu'il lâche ralentissent : longe les murs à l'intérieur des virages."
  },
  {
    id: "vache-malon", title: "La course d'obstacles de Malon", cat: "mini", age: "adult", from: 5, best: 5,
    reward: "Une vache dans ta maison (lait gratuit)",
    needs: ["Avoir libéré Epona."],
    steps: [
      "Revenir au Ranch Lon Lon de jour, à cheval, et parler à Malon.",
      "Finir le parcours d'obstacles en moins de 50 secondes."
    ],
    when: "Purement facultatif. À faire après avoir obtenu Epona si le cœur t'en dit."
  },
  {
    id: "tir-cocorico", title: "Stand de tir de Cocorico", cat: "mini", age: "adult", from: 6, best: 6,
    reward: "Carquois plus grand",
    needs: ["Arc des Fées.", "20 rubis par essai."],
    steps: ["Toucher toutes les cibles sans en manquer une."],
    when: "Juste après le Temple de la Forêt."
  },
  {
    id: "grands-esprits", title: "Le chasseur de Grands Esprits", cat: "side", age: "adult", from: 6, best: 7,
    reward: "Bouteille",
    needs: ["Epona.", "Arc des Fées.", "Au moins une bouteille vide."],
    steps: [
      "À cheval dans la Plaine d'Hyrule, repérer les Grands Esprits qui apparaissent à des endroits précis.",
      "Les abattre à l'arc depuis Epona, puis ramasser leur flamme dans une bouteille.",
      "Les revendre au garde de la boutique d'esprits, à l'entrée du Bourg en ruines.",
      "Répéter jusqu'à atteindre 10 Grands Esprits."
    ],
    when: "Dès que tu as l'arc et Epona. C'est la dernière des quatre bouteilles ; plus tu l'as tôt, plus elle sert.",
    tip: "Il faut passer au galop près des points d'apparition : si tu ralentis, l'esprit disparaît."
  },
  {
    id: "fee-cratere", title: "Grande Fée : magie doublée", cat: "gear", age: "adult", from: 7, best: 7,
    reward: "Jauge de magie doublée",
    needs: ["Masse des Titans.", "Tunique Goron.", "Berceuse de Zelda."],
    steps: [
      "Entrer dans le Cratère du Péril par le sommet de la montagne.",
      "Briser les rochers à la Masse des Titans pour dégager l'entrée de la fontaine.",
      "Jouer la Berceuse de Zelda sur la Triforce."
    ],
    when: "Juste après le Temple du Feu. Une double jauge est très confortable pour la suite (Monocle, flèches magiques)."
  },
  {
    id: "biggoron", title: "L'Épée Biggoron", cat: "side", age: "adult", from: 5, best: 8,
    reward: "Épée Biggoron (deux fois plus puissante que l'Épée de Légende, incassable)",
    needs: [
      "Epona (certaines livraisons sont chronométrées).",
      "Une bouteille de feu bleu pour dégeler le roi Zora (Caverne Polaire).",
      "Epona ou Super Grappin pour franchir le pont de la Vallée Gerudo."
    ],
    steps: [
      "À Cocorico, recevoir l'Œuf de poche d'Anju et attendre qu'il éclose.",
      "Réveiller Talon, endormi dans une maison de Cocorico, avec la Cocotte de poche, puis retourner voir Anju : elle confie Cojiro.",
      "Montrer Cojiro à l'homme assis dans les Bois Perdus (à gauche dès l'entrée) : Champignon suspect.",
      "Chronométré : porter le champignon à la vieille de l'arrière-boutique des potions de Cocorico : Potion bizarre.",
      "Retourner dans les Bois Perdus et donner la potion à la fillette Kokiri : Scie du chasseur.",
      "Donner la scie au chef des charpentiers, de l'autre côté du pont de la Vallée Gerudo : Épée de Goron brisée.",
      "La montrer à Biggoron, au sommet du Mont du Péril : Ordonnance.",
      "Donner l'ordonnance au roi Zora (dégelé) : Crapaud-qui-louche.",
      "Chronométré : porter le crapaud au laboratoire du Lac Hylia : Super gouttes.",
      "Chronométré : porter les gouttes à Biggoron : Certificat.",
      "Attendre quelques jours (le Chant du Soleil accélère) et présenter le certificat : Épée Biggoron."
    ],
    when: "Le début est faisable dès l'âge adulte, mais la chaîne bloque au roi Zora tant que tu n'as pas de feu bleu. Le plus fluide : tout enchaîner pendant l'étape de la Caverne Polaire.",
    tip: "N'achète pas la Lame des Géants au Village Goron : elle se casse après quelques coups. Seule l'Épée Biggoron est incassable."
  },
  {
    id: "fleches-feu", title: "Flèches de Feu", cat: "gear", age: "adult", from: 8, best: 8,
    reward: "Flèches de Feu",
    needs: ["Avoir terminé le Temple de l'Eau (le lac doit être rempli).", "Arc des Fées."],
    steps: [
      "Au Lac Hylia, se placer sur la plaque de pierre de l'îlot central.",
      "Au lever du soleil, tirer une flèche vers le soleil.",
      "Récupérer les flèches tombées sur le petit îlot voisin."
    ],
    when: "Juste après le Temple de l'Eau, tu es déjà au bord du lac.",
    tip: "Le Chant du Soleil permet d'amener l'aube sans attendre."
  },
  {
    id: "peche-adulte", title: "Partie de pêche (adulte)", cat: "mini", age: "adult", from: 5, best: 8,
    reward: "Écaille d'or, puis un quart de cœur",
    needs: ["20 rubis."],
    steps: [
      "À l'étang de pêche du Lac Hylia, attraper un très gros poisson (environ 15 livres) : Écaille d'or.",
      "Au laboratoire du lac, plonger jusqu'au fond du bassin : le professeur donne un quart de cœur."
    ],
    when: "Pendant l'étape du Lac Hylia. L'Écaille d'or permet de plonger plus profond sans les bottes de plomb."
  },
  {
    id: "tir-cheval", title: "Tir à l'arc à cheval", cat: "mini", age: "adult", from: 10, best: 10,
    reward: "Quart de cœur (1000 points), plus grand carquois (1500 points)",
    needs: ["Carte Gerudo.", "Epona.", "Arc des Fées.", "20 rubis par essai."],
    steps: [
      "À la Forteresse Gerudo, parler à la Gerudo près du champ de tir, à cheval.",
      "Marquer 1000 points : quart de cœur.",
      "Marquer 1500 points : carquois plus grand."
    ],
    when: "Dès que tu as la Carte Gerudo."
  },
  {
    id: "fee-nayru", title: "Grande Fée : Amour de Nayru", cat: "gear", age: "both", from: 10, best: 10,
    reward: "Amour de Nayru (bouclier magique temporaire)",
    needs: ["Bombes.", "Berceuse de Zelda.", "Accès au Colosse du Désert."],
    steps: [
      "Au Colosse du Désert, repérer la fissure dans la paroi, entre deux palmiers.",
      "L'exploser et jouer la Berceuse de Zelda sur la Triforce."
    ],
    when: "En arrivant au Colosse, avant ou après le Temple de l'Esprit."
  },
  {
    id: "gymnase", title: "Le Gymnase Gerudo", cat: "side", age: "adult", from: 10, best: 10,
    reward: "Flèches de Glace",
    needs: [
      "Carte Gerudo.",
      "Gantelets d'argent (Temple de l'Esprit, partie enfant).",
      "Super Grappin, Arc, Masse des Titans, Bottes de plomb, Monocle de Vérité."
    ],
    steps: [
      "Entrer dans le Gymnase, à côté de la Forteresse Gerudo.",
      "Terminer les épreuves et récupérer les petites clés.",
      "Ouvrir les portes du labyrinthe central jusqu'au coffre final."
    ],
    when: "Après le Temple de l'Esprit : avant, il te manque les Gantelets d'argent pour tout finir.",
    tip: "Les Flèches de Glace sont totalement facultatives : à faire pour le plaisir du 100 %."
  },
  {
    id: "fee-defense", title: "Grande Fée : défense doublée", cat: "gear", age: "adult", from: 11, best: 11,
    reward: "Défense renforcée (les dégâts reçus sont divisés par deux)",
    needs: ["Gantelets d'or (dans le Château de Ganon).", "Berceuse de Zelda."],
    steps: [
      "Récupérer les Gantelets d'or dans le Château de Ganon, puis ressortir.",
      "À l'extérieur, soulever le pilier géant sur le côté du château.",
      "Jouer la Berceuse de Zelda sur la Triforce."
    ],
    when: "Juste avant de monter dans la tour de Ganon : le combat final devient nettement plus tolérant."
  }
];

/* Paliers de récompenses de la Maison des Skulltulas (Cocorico). */
const SKULL_REWARDS = [
  { at: 10, label: "Grande bourse (200 rubis)" },
  { at: 20, label: "Pierre de Souffrance (vibre près des secrets)" },
  { at: 30, label: "Bourse de géant (500 rubis)" },
  { at: 40, label: "Missiles teigneux" },
  { at: 50, label: "Quart de cœur" },
  { at: 100, label: "Rubis à volonté" }
];

export interface RegularConjugation {
  person: string;
  ar: string;
  er: string;
  ir: string;
  endingAr: string;
  endingEr: string;
  endingIr: string;
  armenianPerson: string;
}

export interface FootballVerb {
  infinitive: string;
  type: string;
  yo: string;
  tu: string;
  el: string;
  nosotros: string;
  vosotros: string;
  ellos: string;
  armenian: string;
}

export const REGULAR_CONJUGATIONS: RegularConjugation[] = [
  { person: 'Yo', ar: 'ayudo', er: 'corro', ir: 'vivo', endingAr: '-o', endingEr: '-o', endingIr: '-o', armenianPerson: 'Ես' },
  { person: 'Tú', ar: 'ayudas', er: 'corres', ir: 'vives', endingAr: '-as', endingEr: '-es', endingIr: '-es', armenianPerson: 'Դու' },
  { person: 'Él / Ella', ar: 'ayuda', er: 'corre', ir: 'vive', endingAr: '-a', endingEr: '-e', endingIr: '-e', armenianPerson: 'Նա' },
  { person: 'Nosotros', ar: 'ayudamos', er: 'corremos', ir: 'vivimos', endingAr: '-amos', endingEr: '-emos', endingIr: '-imos', armenianPerson: 'Մենք' },
  { person: 'Vosotros', ar: 'ayudáis', er: 'corréis', ir: 'vivís', endingAr: '-áis', endingEr: '-éis', endingIr: '-ís', armenianPerson: 'Դուք' },
  { person: 'Ellos / Ellas', ar: 'ayudan', er: 'corren', ir: 'viven', endingAr: '-an', endingEr: '-en', endingIr: '-en', armenianPerson: 'Նրանք' },
];

export const FOOTBALL_VERBS: FootballVerb[] = [
  { infinitive: 'jugar (u->ue)', type: 'Փոխվող արմատ (u->ue)', yo: 'juego', tu: 'juegas', el: 'juega', nosotros: 'jugamos', vosotros: 'jugáis', ellos: 'juegan', armenian: 'Խաղալ' },
  { infinitive: 'hacer', type: 'Անկանոն 1-ին դեմք (yo)', yo: 'hago', tu: 'haces', el: 'hace', nosotros: 'hacemos', vosotros: 'hacéis', ellos: 'hacen', armenian: 'Անել' },
  { infinitive: 'tener (e->ie)', type: 'Անկանոն / e->ie', yo: 'tengo', tu: 'tienes', el: 'tiene', nosotros: 'tenemos', vosotros: 'tenéis', ellos: 'tienen', armenian: 'Ունենալ' },
  { infinitive: 'ir', type: 'Ամբողջովին անկանոն', yo: 'voy', tu: 'vas', el: 'va', nosotros: 'vamos', vosotros: 'vais', ellos: 'van', armenian: 'Գնալ' },
  { infinitive: 'querer (e->ie)', type: 'Փոխվող արմատ (e->ie)', yo: 'quiero', tu: 'quieres', el: 'quiere', nosotros: 'queremos', vosotros: 'queréis', ellos: 'quieren', armenian: 'Ցանկանալ / Ուզել' },
  { infinitive: 'ser', type: 'Ամբողջովին անկանոն', yo: 'soy', tu: 'eres', el: 'es', nosotros: 'somos', vosotros: 'sois', ellos: 'son', armenian: 'Լինել (մշտական)' },
  { infinitive: 'estar', type: 'Անկանոն / Գտնվելու վայր', yo: 'estoy', tu: 'estás', el: 'está', nosotros: 'estamos', vosotros: 'estáis', ellos: 'están', armenian: 'Գտնվել / Լինել' },
  { infinitive: 'poder (o->ue)', type: 'Փոխվող արմատ (o->ue)', yo: 'puedo', tu: 'puedes', el: 'puede', nosotros: 'podemos', vosotros: 'podéis', ellos: 'pueden', armenian: 'Կարողանալ' },
  { infinitive: 'saber', type: 'Անկանոն 1-ին դեմք (sé)', yo: 'sé', tu: 'sabes', el: 'sabe', nosotros: 'sabemos', vosotros: 'sabéis', ellos: 'saben', armenian: 'Իմանալ / Գիտենալ' },
  { infinitive: 'dar', type: 'Անկանոն 1-ին դեմք (doy)', yo: 'doy', tu: 'das', el: 'da', nosotros: 'damos', vosotros: 'dais', ellos: 'dan', armenian: 'Տալ' },
  { infinitive: 'venir (e->ie)', type: 'Անկանոն / e->ie', yo: 'vengo', tu: 'vienes', el: 'viene', nosotros: 'venimos', vosotros: 'venís', ellos: 'vienen', armenian: 'Գալ' },
  { infinitive: 'conocer', type: 'Անկանոն 1-ին դեմք (-zco)', yo: 'conozco', tu: 'conoces', el: 'conoce', nosotros: 'conocemos', vosotros: 'conocéis', ellos: 'conocen', armenian: 'Ճանաչել' },
  { infinitive: 'decir (e->i)', type: 'Անկանոն / e->i', yo: 'digo', tu: 'dices', el: 'dice', nosotros: 'decimos', vosotros: 'decís', ellos: 'dicen', armenian: 'Ասել' },
  { infinitive: 'empezar (e->ie)', type: 'Փոխվող արմատ (e->ie)', yo: 'empiezo', tu: 'empiezas', el: 'empieza', nosotros: 'empezamos', vosotros: 'empezáis', ellos: 'empiezan', armenian: 'Սկսվել / Սկսել' },
  { infinitive: 'volver (o->ue)', type: 'Փոխվող արմատ (o->ue)', yo: 'vuelvo', tu: 'vuelves', el: 'vuelve', nosotros: 'volvemos', vosotros: 'volvéis', ellos: 'vuelven', armenian: 'Վերադառնալ' },
  { infinitive: 'poner', type: 'Անկանոն 1-ին դեմք (pongo)', yo: 'pongo', tu: 'pones', el: 'pone', nosotros: 'ponemos', vosotros: 'ponéis', ellos: 'ponen', armenian: 'Հագնել / Դնել' },
  { infinitive: 'entender (e->ie)', type: 'Փոխվող արմատ (e->ie)', yo: 'entiendo', tu: 'entiendes', el: 'entiende', nosotros: 'entendemos', vosotros: 'entendéis', ellos: 'entienden', armenian: 'Հասկանալ' },
  { infinitive: 'seguir (e->i)', type: 'Փոխվող արմատ (e->i)', yo: 'sigo', tu: 'sigues', el: 'sigue', nosotros: 'seguimos', vosotros: 'seguís', ellos: 'siguen', armenian: 'Շարունակել / Հետևել' },
  { infinitive: 'dormir (o->ue)', type: 'Փոխվող արմատ (o->ue)', yo: 'duermo', tu: 'duermes', el: 'duerme', nosotros: 'dormimos', vosotros: 'dormís', ellos: 'duermen', armenian: 'Քնել' },
  { infinitive: 'ver', type: 'Անկանոն 1-ին դեմք (veo)', yo: 'veo', tu: 'ves', el: 've', nosotros: 'vemos', vosotros: 'veis', ellos: 'ven', armenian: 'Տեսնել / Դիտել' },
  { infinitive: 'pedir (e->i)', type: 'Փոխվող արմատ (e->i)', yo: 'pido', tu: 'pides', el: 'pide', nosotros: 'pedimos', vosotros: 'pedís', ellos: 'piden', armenian: 'Խնդրել' },
  { infinitive: 'ganar', type: 'Կանոնավոր (-ar)', yo: 'gano', tu: 'ganas', el: 'gana', nosotros: 'ganamos', vosotros: 'ganáis', ellos: 'ganan', armenian: 'Հաղթել' },
  { infinitive: 'perder (e->ie)', type: 'Փոխվող արմատ (e->ie)', yo: 'pierdo', tu: 'pierdes', el: 'pierde', nosotros: 'perdemos', vosotros: 'perdéis', ellos: 'pierden', armenian: 'Պարտվել / Կորցնել' },
  { infinitive: 'preferir (e->ie)', type: 'Փոխվող արմատ (e->ie)', yo: 'prefiero', tu: 'prefieres', el: 'prefiere', nosotros: 'preferimos', vosotros: 'preferís', ellos: 'prefieren', armenian: 'Նախընտրել' },
  { infinitive: 'salir', type: 'Անկանոն 1-ին դեմք (salgo)', yo: 'salgo', tu: 'sales', el: 'sale', nosotros: 'salimos', vosotros: 'salís', ellos: 'salen', armenian: 'Դուրս գալ' },
  { infinitive: 'elegir (e->i)', type: 'Փոխվող արմատ (e->i)', yo: 'elijo', tu: 'eliges', el: 'elige', nosotros: 'elegimos', vosotros: 'elegís', ellos: 'eligen', armenian: 'Ընտրել' },
];

export const GRAMMAR_EXAMPLES = [
  {
    es: 'Yo juego al fútbol todos los sábados.',
    hy: 'Ես ամեն շաբաթ ֆուտբոլ եմ խաղում։',
    note: 'jugar (u->ue) -> juego (Yo)',
  },
  {
    es: 'El partido empieza a las cinco de la tarde.',
    hy: 'Խաղը սկսվում է երեկոյան ժամը հինգին։',
    note: 'empezar (e->ie) -> empieza (El partido / él)',
  },
  {
    es: 'Nosotros vamos al estadio los domingos.',
    hy: 'Մենք կիրակի օրերին գնում ենք մարզադաշտ։',
    note: 'ir -> vamos (Nosotros)',
  },
  {
    es: 'Nuestro equipo gana los partidos en casa.',
    hy: 'Մեր թիմը հաղթում է տնային խաղերում։',
    note: 'ganar -> gana (Nuestro equipo / él)',
  },
];

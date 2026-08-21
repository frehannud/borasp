import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Coffee,
  ExternalLink,
  Footprints,
  MapPinned,
  Navigation,
  RotateCcw,
  Search,
  ShoppingBag,
  Sparkles,
  Theater,
  TrainFront,
  Trees,
  Utensils,
} from 'lucide-react';

type Station = {
  name: string;
  line: string;
  neighborhood: string;
  accent: string;
};

type Intent = {
  id: string;
  label: string;
  detail: string;
  Icon: typeof Utensils;
};

type Recommendation = {
  id: string;
  name: string;
  category: string;
  station: string;
  walkingTime: number;
  duration: string;
  price: string;
  description: string;
  image: string;
  address: string;
};

const stations: Station[] = [
  { name: 'Paulista', line: 'Linha 4 — Amarela', neighborhood: 'Bela Vista', accent: '#f3c900' },
  { name: 'Luz', line: 'Linhas 1 e 4', neighborhood: 'Luz', accent: '#ed1c24' },
  { name: 'Pinheiros', line: 'Linha 4 — Amarela', neighborhood: 'Pinheiros', accent: '#f3c900' },
  { name: 'Vila Madalena', line: 'Linha 2 — Verde', neighborhood: 'Sumaré', accent: '#008c45' },
  { name: 'Liberdade', line: 'Linha 1 — Azul', neighborhood: 'Liberdade', accent: '#00549a' },
  { name: 'Tatuapé', line: 'Linha 3 — Vermelha', neighborhood: 'Tatuapé', accent: '#e8342a' },
  { name: 'Paraíso', line: 'Linhas 1 e 2', neighborhood: 'Paraíso', accent: '#00549a' },
  { name: 'Santa Cecília', line: 'Linha 3 — Vermelha', neighborhood: 'Santa Cecília', accent: '#e8342a' },
];

const intents: Intent[] = [
  { id: 'rangos', label: 'Rangos', detail: 'Comer bem sem pensar muito', Icon: Utensils },
  { id: 'cultura', label: 'Rolê cultural', detail: 'Arte, história e boas ideias', Icon: Theater },
  { id: 'cafes', label: 'Cafés', detail: 'Uma pausa com café na mão', Icon: Coffee },
  { id: 'compras', label: 'Compras', detail: 'Garimpar algo diferente', Icon: ShoppingBag },
  { id: 'lazer', label: 'Lazer', detail: 'Ar livre e tempo bem gasto', Icon: Trees },
];

const recommendations: Recommendation[] = [
  {
    id: 'masp',
    name: 'MASP — Museu de Arte',
    category: 'Rolê cultural',
    station: 'Paulista',
    walkingTime: 6,
    duration: '1h30',
    price: 'R$ 30',
    description: 'O clássico da Paulista para ver arte, arquitetura e a cidade passando por baixo do vão.',
    image: 'https://images.pexels.com/photos/3626422/pexels-photo-3626422.jpeg?auto=compress&cs=tinysrgb&w=1200',
    address: 'Av. Paulista, 1578 — Bela Vista',
  },
  {
    id: 'japan-house',
    name: 'Japan House',
    category: 'Rolê cultural',
    station: 'Paulista',
    walkingTime: 10,
    duration: '1h',
    price: 'Grátis',
    description: 'Exposições que conectam design, tecnologia e cultura japonesa em uma parada rápida e visual.',
    image: 'https://images.pexels.com/photos/161853/art-museum-gallery-exhibition-architecture-161853.jpeg?auto=compress&cs=tinysrgb&w=1200',
    address: 'Av. Paulista, 52 — Paraíso',
  },
  {
    id: 'ims',
    name: 'IMS Paulista',
    category: 'Rolê cultural',
    station: 'Paulista',
    walkingTime: 8,
    duration: '1h',
    price: 'Grátis',
    description: 'Fotografia, cinema e uma varanda ótima para observar a Paulista do alto.',
    image: 'https://images.pexels.com/photos/20967/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200',
    address: 'Av. Paulista, 2424 — Bela Vista',
  },
  {
    id: 'pinacoteca',
    name: 'Pinacoteca de São Paulo',
    category: 'Rolê cultural',
    station: 'Luz',
    walkingTime: 7,
    duration: '1h30',
    price: 'R$ 20',
    description: 'Arte brasileira em um prédio histórico, com jardim e a energia do centro logo na saída.',
    image: 'https://images.pexels.com/photos/209702/pexels-photo-209702.jpeg?auto=compress&cs=tinysrgb&w=1200',
    address: 'Praça da Luz, 2 — Luz',
  },
  {
    id: 'estacao-pipoca',
    name: 'Museu da Língua Portuguesa',
    category: 'Rolê cultural',
    station: 'Luz',
    walkingTime: 4,
    duration: '1h',
    price: 'R$ 24',
    description: 'Uma visita imersiva para sair falando da nossa língua de um jeito totalmente diferente.',
    image: 'https://images.pexels.com/photos/267586/pexels-photo-267586.jpeg?auto=compress&cs=tinysrgb&w=1200',
    address: 'Praça da Luz, s/n — Luz',
  },
  {
    id: 'mercado-pinheiros',
    name: 'Mercado de Pinheiros',
    category: 'Rangos',
    station: 'Pinheiros',
    walkingTime: 8,
    duration: '1h',
    price: '$$',
    description: 'Bancas, cozinhas autorais e o tipo de almoço que resolve o dia em uma só parada.',
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1200',
    address: 'R. Pedro Cristi, 89 — Pinheiros',
  },
  {
    id: 'casa-do-porco',
    name: 'A Casa do Porco',
    category: 'Rangos',
    station: 'Santa Cecília',
    walkingTime: 9,
    duration: '2h',
    price: '$$$',
    description: 'Alta gastronomia sem frescura no centro: menu brasileiro, criativo e cheio de sabor.',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200',
    address: 'R. Araújo, 124 — República',
  },
  {
    id: 'kintaro',
    name: 'Izakaya Kintaro',
    category: 'Rangos',
    station: 'Liberdade',
    walkingTime: 5,
    duration: '1h',
    price: '$$',
    description: 'Balcão pequeno, pratos quentes e clima de bairro para comer algo diferente sem cerimônia.',
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=1200',
    address: 'R. Tomás Gonzaga, 57 — Liberdade',
  },
  {
    id: 'coffee-lab',
    name: 'Coffee Lab',
    category: 'Cafés',
    station: 'Pinheiros',
    walkingTime: 11,
    duration: '45 min',
    price: '$$',
    description: 'Café brasileiro tratado como experiência, com grãos especiais e um quintal para desacelerar.',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1200',
    address: 'R. Fradique Coutinho, 1340 — Pinheiros',
  },
  {
    id: 'cafe-floresta',
    name: 'Café Floresta',
    category: 'Cafés',
    station: 'Paulista',
    walkingTime: 5,
    duration: '30 min',
    price: '$',
    description: 'Espresso rápido, pão de queijo e uma mesa na sombra para fazer uma pausa no caminho.',
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1200',
    address: 'Al. Santos, 1293 — Jardim Paulista',
  },
  {
    id: 'beco',
    name: 'Beco do Batman',
    category: 'Lazer',
    station: 'Vila Madalena',
    walkingTime: 14,
    duration: '1h30',
    price: 'Grátis',
    description: 'Um passeio a céu aberto por murais que mudam sempre — bom para andar sem destino fixo.',
    image: 'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&w=1200',
    address: 'R. Gonçalo Afonso — Vila Madalena',
  },
  {
    id: 'parque-augusta',
    name: 'Parque Augusta',
    category: 'Lazer',
    station: 'Paulista',
    walkingTime: 12,
    duration: '1h',
    price: 'Grátis',
    description: 'Verde no meio do concreto, sombra para respirar e uma boa continuação para a tarde.',
    image: 'https://images.pexels.com/photos/1582519/pexels-photo-1582519.jpeg?auto=compress&cs=tinysrgb&w=1200',
    address: 'R. Augusta, 200 — Consolação',
  },
  {
    id: 'cultura-shopping',
    name: 'Shopping Pátio Paulista',
    category: 'Compras',
    station: 'Paraíso',
    walkingTime: 8,
    duration: '1h30',
    price: '$$',
    description: 'Lojas, livraria e uma pausa para comer em um roteiro protegido do tempo ruim.',
    image: 'https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg?auto=compress&cs=tinysrgb&w=1200',
    address: 'R. Treze de Maio, 1947 — Bela Vista',
  },
  {
    id: 'shopping-tatuape',
    name: 'Shopping Anália Franco',
    category: 'Compras',
    station: 'Tatuapé',
    walkingTime: 16,
    duration: '2h',
    price: '$$',
    description: 'Um roteiro prático para garimpar marcas, resolver a vida e ainda tomar um café.',
    image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1200',
    address: 'Av. Regente Feijó, 1739 — Tatuapé',
  },
];

type Phase = 'station' | 'intent' | 'loading' | 'result' | 'error';

const getIcon = (intent: Intent | undefined) => intent?.Icon ?? Sparkles;

function App() {
  const [phase, setPhase] = useState<Phase>('station');
  const [station, setStation] = useState<Station | null>(null);
  const [intent, setIntent] = useState<Intent | null>(null);
  const [time, setTime] = useState<'30 min' | '2 horas'>('30 min');
  const [query, setQuery] = useState('');
  const [alternativeUsed, setAlternativeUsed] = useState(false);
  const [selectionError, setSelectionError] = useState('');

  const filteredStations = useMemo(
    () => stations.filter((item) => item.name.toLowerCase().includes(query.toLowerCase().trim())),
    [query],
  );

  const matchingRecommendations = useMemo(() => {
    if (!station || !intent) return [];
    const exact = recommendations.filter(
      (item) => item.station === station.name && item.category === intent.label,
    );
    const byIntent = recommendations.filter((item) => item.category === intent.label);
    return exact.length ? exact : byIntent;
  }, [station, intent]);

  const currentRecommendation = matchingRecommendations[alternativeUsed ? 1 : 0];
  const Icon = getIcon(intent ?? undefined);

  useEffect(() => {
    if (phase !== 'loading') return;
    const timer = window.setTimeout(() => {
      if (matchingRecommendations.length) setPhase('result');
      else setPhase('error');
    }, 2000);
    return () => window.clearTimeout(timer);
  }, [phase, matchingRecommendations.length]);

  const chooseStation = (nextStation: Station) => {
    setStation(nextStation);
    setSelectionError('');
  };

  const continueToIntent = () => {
    if (!station) {
      setSelectionError('Escolha uma estação para continuar.');
      return;
    }
    setPhase('intent');
    setSelectionError('');
  };

  const startSearch = () => {
    if (!intent) {
      setSelectionError('Escolha o tipo de rolê que combina com agora.');
      return;
    }
    setAlternativeUsed(false);
    setPhase('loading');
    setSelectionError('');
  };

  const restart = () => {
    setPhase('station');
    setStation(null);
    setIntent(null);
    setTime('30 min');
    setQuery('');
    setAlternativeUsed(false);
    setSelectionError('');
  };

  const goBack = () => {
    if (phase === 'intent') setPhase('station');
    else if (phase === 'result' || phase === 'error') setPhase('intent');
    else if (phase === 'loading') setPhase('intent');
  };

  const tryAnother = () => {
    if (!alternativeUsed && matchingRecommendations.length > 1) {
      setAlternativeUsed(true);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#e9e8e1] text-[#18202c]">
      <header className="bg-[#00549a] text-white">
        <div className="mx-auto flex min-h-[72px] max-w-[1180px] items-center justify-between px-5 py-4 lg:px-10">
          <button
            type="button"
            onClick={phase === 'station' ? restart : goBack}
            className="flex min-h-11 min-w-11 items-center justify-center border border-white/35 transition hover:bg-white/10 active:scale-95 disabled:opacity-60"
            aria-label={phase === 'station' ? 'Recomeçar' : 'Voltar'}
            data-testid="button-header-back"
          >
            {phase === 'station' ? <TrainFront size={22} strokeWidth={1.8} /> : <ArrowLeft size={22} strokeWidth={1.8} />}
          </button>
          <div className="text-center">
            <div className="font-mono text-[19px] font-bold tracking-[-.08em]">BORA<span className="text-[#ffd400]">SP</span></div>
            <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[.22em] text-white/70">descoberta urbana</div>
          </div>
          <button
            type="button"
            onClick={restart}
            className="flex min-h-11 min-w-11 items-center justify-center border border-white/35 text-white/85 transition hover:bg-white/10 active:scale-95"
            aria-label="Recomeçar descoberta"
            data-testid="button-restart"
          >
            <RotateCcw size={19} strokeWidth={1.8} />
          </button>
        </div>
        <div className="h-1 bg-[#ffd400]" />
      </header>

      <main className="urban-grid min-h-[calc(100dvh-77px)] px-4 py-7 sm:px-6 lg:px-10 lg:py-12">
        <div className="mx-auto grid max-w-[1180px] gap-7 lg:grid-cols-[.74fr_1.26fr] lg:gap-12">
          <aside className="hidden self-start lg:block lg:pt-8">
            <div className="mb-8 inline-flex items-center gap-2 border border-[#18202c] bg-[#ffd400] px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[.12em]">
              <span className="h-2 w-2 bg-[#00549a]" /> São Paulo, agora
            </div>
            <h1 className="max-w-[380px] font-mono text-[clamp(38px,4vw,62px)] font-bold leading-[.98] tracking-[-.09em]">
              Saiu do metrô.<br /><span className="text-[#00549a]">Bora?</span>
            </h1>
            <p className="mt-6 max-w-[330px] text-[17px] leading-7 text-[#4d5661]">
              Uma boa ideia está a poucos minutos de você. Diga onde está e o que bateu vontade.
            </p>
            <div className="mt-12 border-l-2 border-[#00549a] pl-4">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[.14em] text-[#00549a]">feito para decidir rápido</div>
              <div className="mt-2 text-sm text-[#4d5661]">Uma sugestão por vez. Sem lista infinita.</div>
            </div>
          </aside>

          <section className="mx-auto w-full max-w-[650px] lg:max-w-none">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-[.17em] text-[#00549a]">
                  {phase === 'station' ? '01 / ponto de partida' : phase === 'intent' ? '02 / seu momento' : phase === 'loading' ? '03 / procurando' : '03 / achamos'}
                </div>
                <div className="mt-2 flex gap-1.5" aria-label="Progresso da descoberta">
                  {[0, 1, 2].map((step) => {
                    const active = (phase === 'station' ? 0 : phase === 'intent' ? 1 : 2) >= step;
                    return <span key={step} className={`h-1.5 w-12 sm:w-16 ${active ? 'bg-[#00549a]' : 'bg-[#b9bdba]'}`} />;
                  })}
                </div>
              </div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[.12em] text-[#6b7379]">{time}</div>
            </div>

            {phase === 'station' && (
              <div className="slide-in">
                <div className="mb-7">
                  <p className="mb-2 text-sm font-semibold text-[#00549a]">Primeiro, localiza a gente.</p>
                  <h2 className="font-mono text-[clamp(27px,6vw,43px)] font-bold leading-[1.03] tracking-[-.08em]">Onde você está?</h2>
                  <p className="mt-3 max-w-[490px] text-[15px] leading-6 text-[#5b6268]">Escolha a estação mais perto. A gente calcula o resto.</p>
                </div>
                <label className="relative mb-4 block">
                  <span className="sr-only">Buscar estação</span>
                  <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#00549a]" size={20} />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Digite o nome da estação"
                    className="h-14 w-full border-2 border-[#18202c] bg-[#fffef8] pl-12 pr-12 text-base outline-none transition placeholder:text-[#858b8e] focus:border-[#00549a] focus:ring-4 focus:ring-[#00549a]/15"
                    data-testid="input-search-station"
                  />
                  {query && (
                    <button type="button" onClick={() => setQuery('')} className="absolute right-3 top-1/2 min-h-9 min-w-9 -translate-y-1/2 text-[#00549a]" aria-label="Limpar busca" data-testid="button-clear-search">
                      <span className="text-xl leading-none">×</span>
                    </button>
                  )}
                </label>

                {filteredStations.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {filteredStations.map((item, index) => {
                      const selected = station?.name === item.name;
                      return (
                        <button
                          type="button"
                          key={item.name}
                          onClick={() => chooseStation(item)}
                          className={`group flex min-h-[76px] items-center gap-3 border-2 p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#00549a] active:translate-y-0 ${selected ? 'border-[#18202c] bg-[#ffd400] shadow-[4px_4px_0_#00549a]' : 'border-[#18202c] bg-[#fffef8]'}`}
                          data-testid={`button-station-${item.name.toLowerCase().replaceAll(' ', '-')}`}
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#18202c] bg-[#00549a] text-white" style={{ borderLeft: `5px solid ${item.accent}` }}>
                            {selected ? <Check size={19} strokeWidth={2.5} /> : <TrainFront size={19} strokeWidth={1.8} />}
                          </span>
                          <span className="min-w-0">
                            <span className="block font-semibold">{item.name}</span>
                            <span className="mt-0.5 block truncate text-xs text-[#5b6268]">{item.neighborhood} · {item.line}</span>
                          </span>
                          {selected && <span className="ml-auto font-mono text-[9px] font-bold uppercase tracking-wider">aqui</span>}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-[#18202c]/40 bg-[#fffef8] px-5 py-9 text-center fade-in" data-testid="empty-station-results">
                    <AlertCircle className="mx-auto text-[#00549a]" size={28} strokeWidth={1.7} />
                    <p className="mt-3 font-semibold">Nada encontrado por aqui.</p>
                    <p className="mt-1 text-sm text-[#6b7379]">Tente o nome de outra estação.</p>
                    <button type="button" onClick={() => setQuery('')} className="mt-4 font-semibold text-[#00549a] underline underline-offset-4" data-testid="button-reset-search">Limpar busca</button>
                  </div>
                )}

                <div className="mt-7">
                  {selectionError && <p className="mb-3 text-sm font-semibold text-[#a62f2f]" role="alert" data-testid="error-station-selection">{selectionError}</p>}
                  <button
                    type="button"
                    onClick={continueToIntent}
                    className="flex h-14 w-full items-center justify-center gap-3 border-2 border-[#00549a] bg-[#00549a] px-5 font-bold text-white transition hover:bg-[#003f73] active:scale-[.99] focus:outline-none focus:ring-4 focus:ring-[#00549a]/20"
                    data-testid="button-continue-intent"
                  >
                    Continuar <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {phase === 'intent' && (
              <div className="slide-in">
                <div className="mb-7">
                  <p className="mb-2 text-sm font-semibold text-[#00549a]">Você está em {station?.name}.</p>
                  <h2 className="font-mono text-[clamp(27px,6vw,43px)] font-bold leading-[1.03] tracking-[-.08em]">O que quer agora?</h2>
                  <p className="mt-3 text-[15px] leading-6 text-[#5b6268]">Sem compromisso. Escolha o clima e deixa o resto com a gente.</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {intents.map((item) => {
                    const selected = intent?.id === item.id;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => { setIntent(item); setSelectionError(''); }}
                        className={`flex min-h-[102px] items-start gap-3 border-2 p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#00549a] active:translate-y-0 ${selected ? 'border-[#18202c] bg-[#ffd400] shadow-[4px_4px_0_#00549a]' : 'border-[#18202c] bg-[#fffef8]'}`}
                        data-testid={`button-intent-${item.id}`}
                      >
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center border border-[#18202c] ${selected ? 'bg-[#00549a] text-white' : 'bg-[#e4eef4] text-[#00549a]'}`}>
                          <item.Icon size={20} strokeWidth={1.8} />
                        </span>
                        <span>
                          <span className="flex items-center gap-2 font-semibold">{item.label}{selected && <Check size={15} strokeWidth={2.5} />}</span>
                          <span className="mt-1 block text-xs leading-4 text-[#5b6268]">{item.detail}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-7 border-t-2 border-[#18202c]/15 pt-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Clock3 size={17} className="text-[#00549a]" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[.12em]">Quanto tempo tem?</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {(['30 min', '2 horas'] as const).map((option) => (
                      <button
                        type="button"
                        key={option}
                        onClick={() => setTime(option)}
                        className={`flex h-12 items-center justify-center gap-2 border-2 font-semibold transition active:scale-[.98] ${time === option ? 'border-[#00549a] bg-[#e4eef4] text-[#00549a]' : 'border-[#18202c] bg-[#fffef8] text-[#4d5661]'}`}
                        data-testid={`button-time-${option.replace(' ', '-')}`}
                      >
                        {time === option && <Check size={16} />} {option}
                      </button>
                    ))}
                  </div>
                </div>
                {selectionError && <p className="mt-4 text-sm font-semibold text-[#a62f2f]" role="alert" data-testid="error-intent-selection">{selectionError}</p>}
                <button type="button" onClick={startSearch} className="mt-6 flex h-14 w-full items-center justify-center gap-3 border-2 border-[#00549a] bg-[#00549a] px-5 font-bold text-white transition hover:bg-[#003f73] active:scale-[.99] focus:outline-none focus:ring-4 focus:ring-[#00549a]/20" data-testid="button-find-recommendation">
                  Encontrar meu rolê <Sparkles size={19} />
                </button>
              </div>
            )}

            {phase === 'loading' && (
              <div className="slide-in flex min-h-[480px] flex-col items-center justify-center border-2 border-[#18202c] bg-[#fffef8] px-6 py-14 text-center" data-testid="status-loading">
                <div className="relative flex h-24 w-24 items-center justify-center border-2 border-[#18202c] bg-[#ffd400] loading-pulse">
                  <Navigation size={39} className="text-[#00549a]" strokeWidth={1.5} />
                  <span className="absolute -right-2 -top-2 h-4 w-4 border-2 border-[#18202c] bg-[#00549a]" />
                  <span className="absolute -bottom-2 -left-2 h-4 w-4 border-2 border-[#18202c] bg-[#00549a]" />
                </div>
                <p className="mt-9 font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#00549a]">GPS mental ligado</p>
                <h2 className="mt-3 font-mono text-2xl font-bold tracking-[-.07em] sm:text-3xl">Encontrando o melhor pico...</h2>
                <p className="mt-3 max-w-[350px] text-sm leading-6 text-[#6b7379]">Cruzando estação, vontade e tempo disponível.</p>
                <div className="mt-9 h-2 w-full max-w-[320px] overflow-hidden bg-[#d8d9d4]" aria-label="Carregando recomendação">
                  <div className="progress-run h-full w-full origin-left bg-[#00549a]" />
                </div>
                <div className="mt-3 flex w-full max-w-[320px] justify-between font-mono text-[9px] font-bold uppercase tracking-wider text-[#858b8e]"><span>lendo a cidade</span><span>quase lá</span></div>
              </div>
            )}

            {phase === 'result' && currentRecommendation && (
              <div className="slide-in">
                <div className="mb-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="mb-2 text-sm font-semibold text-[#00549a]">Um palpite certeiro para você.</p>
                    <h2 className="font-mono text-[clamp(27px,6vw,43px)] font-bold leading-[1.03] tracking-[-.08em]">Bora nesse?</h2>
                  </div>
                  <span className="hidden border border-[#18202c] bg-[#ffd400] px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider sm:block">curadoria local</span>
                </div>
                <article className="border-2 border-[#18202c] bg-[#fffef8] shadow-[5px_5px_0_#00549a]" data-testid={`card-recommendation-${currentRecommendation.id}`}>
                  <div className="relative aspect-[16/9] overflow-hidden border-b-2 border-[#18202c] bg-[#d8d9d4]">
                    <img src={currentRecommendation.image} alt={`Imagem de ${currentRecommendation.name}`} className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]" data-testid={`img-recommendation-${currentRecommendation.id}`} />
                    <div className="absolute left-3 top-3 border border-[#18202c] bg-[#ffd400] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide">{currentRecommendation.category}</div>
                  </div>
                  <div className="p-5 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-mono text-[23px] font-bold leading-tight tracking-[-.07em] sm:text-[28px]" data-testid="text-recommendation-name">{currentRecommendation.name}</h3>
                        <p className="mt-2 text-sm text-[#6b7379]">{currentRecommendation.address}</p>
                      </div>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#18202c] bg-[#e4eef4] text-[#00549a]"><Icon size={20} /></span>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 border border-[#18202c] bg-[#ffd400] px-2.5 py-1.5 text-xs font-bold" data-testid="text-walking-time"><Footprints size={14} /> {currentRecommendation.walkingTime} min a pé</span>
                      <span className="inline-flex items-center gap-1.5 border border-[#18202c] bg-[#e4eef4] px-2.5 py-1.5 text-xs font-bold" data-testid="text-duration"><Clock3 size={14} /> {currentRecommendation.duration}</span>
                      <span className="border border-[#18202c] bg-[#fffef8] px-2.5 py-1.5 font-mono text-xs font-bold" data-testid="text-price">{currentRecommendation.price}</span>
                    </div>
                    <p className="mt-6 text-[15px] leading-7 text-[#414951]" data-testid="text-recommendation-description">{currentRecommendation.description}</p>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${currentRecommendation.name}, ${currentRecommendation.address}, São Paulo`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-7 flex h-14 w-full items-center justify-center gap-2 border-2 border-[#00549a] bg-[#00549a] font-bold text-white transition hover:bg-[#003f73] active:scale-[.99] focus:outline-none focus:ring-4 focus:ring-[#00549a]/20"
                      data-testid="link-open-map"
                    >
                      <MapPinned size={19} /> Abrir no Google Maps <ExternalLink size={16} />
                    </a>
                    <div className="mt-5 flex items-center justify-between border-t border-[#18202c]/15 pt-5">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[.12em] text-[#858b8e]">{alternativeUsed ? 'última sugestão' : '1 de 2 sugestões'}</span>
                      <button type="button" onClick={tryAnother} disabled={alternativeUsed || matchingRecommendations.length < 2} className="flex min-h-11 items-center gap-2 font-semibold text-[#00549a] underline decoration-[#ffd400] decoration-2 underline-offset-4 transition hover:text-[#003f73] disabled:cursor-not-allowed disabled:text-[#858b8e] disabled:no-underline" data-testid="button-try-another">
                        Tentar outro <RotateCcw size={16} />
                      </button>
                    </div>
                  </div>
                </article>
                <button type="button" onClick={restart} className="mx-auto mt-7 flex min-h-11 items-center gap-2 font-semibold text-[#4d5661] underline underline-offset-4 transition hover:text-[#00549a]" data-testid="button-restart-result"><ArrowLeft size={16} /> Começar de novo</button>
              </div>
            )}

            {phase === 'error' && (
              <div className="slide-in border-2 border-[#18202c] bg-[#fffef8] px-6 py-12 text-center" data-testid="status-error">
                <div className="mx-auto flex h-16 w-16 items-center justify-center border-2 border-[#a62f2f] bg-[#fae9e6] text-[#a62f2f]"><AlertCircle size={30} /></div>
                <h2 className="mt-6 font-mono text-2xl font-bold tracking-[-.07em]">Esse pico escapou.</h2>
                <p className="mx-auto mt-3 max-w-[340px] text-sm leading-6 text-[#6b7379]">Não encontramos uma combinação por aqui. Troque a estação ou a vibe e tenta de novo.</p>
                <button type="button" onClick={() => setPhase('station')} className="mt-7 inline-flex h-12 items-center justify-center gap-2 border-2 border-[#00549a] bg-[#00549a] px-6 font-bold text-white transition hover:bg-[#003f73] active:scale-[.98]" data-testid="button-error-choose-station">Escolher outra estação <TrainFront size={18} /></button>
              </div>
            )}

          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
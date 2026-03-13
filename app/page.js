"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const producerImage = "/producer-photo.jpg";

const licenseOptions = [
  {
    id: "mp3",
    name: "MP3 Lease",
    price: 39,
    description: "Entry license for independent artists.",
  },
  {
    id: "wav",
    name: "WAV Lease",
    price: 69,
    description: "Higher quality studio-ready files.",
  },
  {
    id: "trackouts",
    name: "Trackouts",
    price: 129,
    description: "Full stems for more control in the mix.",
  },
  {
    id: "unlimited",
    name: "Unlimited",
    price: 199,
    description: "Best for serious releases and broader usage.",
  },
];

const beats = [
  {
    id: 1,
    title: "Broken Crown",
    subtitle: "Rod Wave Type Beat",
    mood: "Pain",
    genre: "Melodic Trap",
    artistType: "Melodic",
    bpm: 146,
    key: "F Minor",
    price: 39,
    exclusive: true,
    tag: "Signature",
    image: "/covers/broken-crown.jpg",
    preview: "/audio/broken-crown.mp3",
  },
  {
    id: 2,
    title: "Legacy Mode",
    subtitle: "Lil Baby Type Beat",
    mood: "Victory",
    genre: "Trap",
    artistType: "Rapper",
    bpm: 154,
    key: "D# Minor",
    price: 39,
    exclusive: true,
    tag: "Trending",
    image: "/covers/legacy-mode.jpg",
    preview: "/audio/legacy-mode.mp3",
  },
  {
    id: 3,
    title: "Midnight Scars",
    subtitle: "YoungBoy Type Beat",
    mood: "Pain",
    genre: "Street Trap",
    artistType: "Rapper",
    bpm: 142,
    key: "C Minor",
    price: 39,
    exclusive: false,
    tag: "New",
    image: "/covers/midnight-scars.jpg",
    preview: "/audio/midnight-scars.mp3",
  },
  {
    id: 4,
    title: "Rise Above",
    subtitle: "Kevin Gates Type Beat",
    mood: "Victory",
    genre: "Southern Trap",
    artistType: "Rapper",
    bpm: 150,
    key: "G Minor",
    price: 39,
    exclusive: true,
    tag: "Exclusive",
    image: "/covers/rise-above.jpg",
    preview: "/audio/rise-above.mp3",
  },
  {
    id: 5,
    title: "Silent Battles",
    subtitle: "Drake Type Beat",
    mood: "Pain",
    genre: "Cinematic Trap",
    artistType: "Melodic",
    bpm: 138,
    key: "A Minor",
    price: 39,
    exclusive: false,
    tag: "Signature",
    image: "/covers/silent-battles.jpg",
    preview: "/audio/silent-battles.mp3",
  },
  {
    id: 6,
    title: "Golden Ascension",
    subtitle: "Future Type Beat",
    mood: "Victory",
    genre: "Trap",
    artistType: "Rapper",
    bpm: 148,
    key: "E Minor",
    price: 39,
    exclusive: true,
    tag: "Trending",
    image: "/covers/golden-ascension.jpg",
    preview: "/audio/golden-ascension.mp3",
  },
];

const bundles = [
  {
    name: "Artist Journey Pack",
    beats: 3,
    price: 99,
    text: "A focused starter bundle for artists building their first serious release.",
  },
  {
    name: "Pain & Progression",
    beats: 5,
    price: 149,
    text: "Emotional records built for struggle, reflection, and elevation.",
  },
  {
    name: "Street Tape Kit",
    beats: 7,
    price: 199,
    text: "Underground records with pain, pressure, and power.",
  },
  {
    name: "Studio Creator Pack",
    beats: 10,
    price: 249,
    text: "Best-value bundle for artists creating a full project fast.",
  },
];

function WaveBars() {
  const bars = [16, 26, 12, 28, 20, 34, 16, 24, 14, 30, 18, 12, 22, 16];
  return (
    <div style={{ display: "flex", alignItems: "end", gap: 4, height: 42 }}>
      {bars.map((h, i) => (
        <div
          key={i}
          style={{
            width: 5,
            height: h,
            borderRadius: 999,
            background: "linear-gradient(to top, #dc2626, #f97316, #e5e7eb)",
            opacity: 0.9,
          }}
        />
      ))}
    </div>
  );
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}

function BeatCard({
  beat,
  activeBeatId,
  onTogglePlay,
  imageErrorMap,
  onImageError,
  onOpenLicenses,
  onQuickAdd,
}) {
  const isPlaying = activeBeatId === beat.id;
  const showFallback = imageErrorMap[beat.id];
  const defaultLicense = licenseOptions[0];

  return (
    <div style={styles.card}>
      <div style={styles.cardImage}>
        {!showFallback ? (
          <img
            src={beat.image}
            alt={beat.title}
            style={styles.cardRealImage}
            onError={() => onImageError(beat.id)}
          />
        ) : (
          <div style={styles.cardFallbackImage}>ADD COVER ART HERE</div>
        )}
        <div style={styles.cardOverlay} />
        <div style={styles.cardTopRow}>
          <span style={styles.tag}>{beat.tag}</span>
          {beat.exclusive && <span style={styles.exclusiveTag}>Exclusive</span>}
        </div>

        <div style={styles.cardBottom}>
          <div>
            <div style={styles.cardTitle}>{beat.title}</div>
            <div style={styles.cardSubtitle}>{beat.subtitle}</div>
          </div>
          <button style={styles.playButton} onClick={() => onTogglePlay(beat)}>
            {isPlaying ? "❚❚" : "▶"}
          </button>
        </div>
      </div>

      <div style={styles.cardContent}>
        <WaveBars />

        <div style={styles.badgeRow}>
          <span style={styles.infoBadge}>{beat.mood}</span>
          <span style={styles.infoBadge}>{beat.genre}</span>
          <span style={styles.infoBadge}>{beat.bpm} BPM</span>
          <span style={styles.infoBadge}>{beat.key}</span>
        </div>

        <div style={styles.priceRow}>
          <div>
            <div style={styles.startingAt}>Starting at</div>
            <div style={styles.price}>${beat.price}</div>
          </div>
          <div style={styles.cardActionButtons}>
            <button style={styles.secondaryMiniButton} onClick={() => onOpenLicenses(beat)}>
              Licenses
            </button>
            <button style={styles.addButton} onClick={() => onQuickAdd(beat, defaultLicense)}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div style={styles.sectionTitleWrap}>
      <div style={styles.eyebrow}>{eyebrow}</div>
      <h2 style={styles.sectionTitle}>{title}</h2>
      <p style={styles.sectionText}>{text}</p>
    </div>
  );
}

function StickyPlayer({ activeBeat, isPlaying, currentTime, duration, onTogglePlay, onClose, onSeek }) {
  if (!activeBeat) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div style={styles.playerBarWrap}>
      <div style={styles.playerBar}>
        <div style={styles.playerMeta}>
          <div style={styles.playerArtWrap}>
            <img
              src={activeBeat.image}
              alt={activeBeat.title}
              style={styles.playerArt}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <div>
            <div style={styles.playerLabel}>Now Playing</div>
            <div style={styles.playerTitle}>{activeBeat.title}</div>
            <div style={styles.playerSubtitle}>{activeBeat.subtitle}</div>
          </div>
        </div>

        <div style={styles.playerCenter}>
          <div style={styles.playerControls}>
            <button style={styles.playerMainButton} onClick={() => onTogglePlay(activeBeat)}>
              {isPlaying ? "❚❚" : "▶"}
            </button>
            <div style={styles.playerTime}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div style={styles.playerProgressRow}>
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={Math.min(currentTime, duration || 0)}
              onChange={(e) => onSeek(Number(e.target.value))}
              style={{
                ...styles.playerRange,
                background: `linear-gradient(to right, #ef4444 0%, #f97316 ${progress}%, #27272a ${progress}%, #27272a 100%)`,
              }}
            />
          </div>
        </div>

        <div style={styles.playerRight}>
          <div style={styles.playerBadge}>{activeBeat.bpm} BPM</div>
          <div style={styles.playerBadge}>{activeBeat.key}</div>
          <button style={styles.playerCloseButton} onClick={onClose}>
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

function LicenseModal({ beat, onClose, onAddToCart }) {
  if (!beat) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalCard}>
        <div style={styles.cartHeader}>
          <div>
            <div style={styles.playerLabel}>License Options</div>
            <div style={styles.cartTitle}>{beat.title}</div>
            <div style={styles.cartItemSubtitle}>{beat.subtitle}</div>
          </div>
          <button style={styles.playerCloseButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div style={styles.licenseGrid}>
          {licenseOptions.map((license) => (
            <div key={license.id} style={styles.licenseCard}>
              <div>
                <div style={styles.cartItemTitle}>{license.name}</div>
                <div style={styles.cartItemSubtitle}>{license.description}</div>
              </div>
              <div style={styles.licenseBottom}>
                <div style={styles.licensePrice}>${license.price}</div>
                <button
                  style={styles.addButton}
                  onClick={() => {
                    onAddToCart(beat, license);
                    onClose();
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ cartItems, isOpen, onClose, onRemove, onCheckout, total }) {
  if (!isOpen) return null;

  return (
    <div style={styles.cartDrawerWrap}>
      <div style={styles.cartDrawer}>
        <div style={styles.cartHeader}>
          <div>
            <div style={styles.playerLabel}>Cart</div>
            <div style={styles.cartTitle}>Checkout Queue</div>
          </div>
          <button style={styles.playerCloseButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div style={styles.cartList}>
          {cartItems.length === 0 ? (
            <div style={styles.emptyCart}>Your cart is empty.</div>
          ) : (
            cartItems.map((item, index) => (
              <div key={`${item.beat.id}-${item.license.id}-${index}`} style={styles.cartItem}>
                <div>
                  <div style={styles.cartItemTitle}>{item.beat.title}</div>
                  <div style={styles.cartItemSubtitle}>{item.beat.subtitle}</div>
                  <div style={styles.cartItemLicense}>{item.license.name}</div>
                </div>
                <div style={styles.cartItemRight}>
                  <div style={styles.cartPrice}>${item.license.price}</div>
                  <button style={styles.removeButton} onClick={() => onRemove(index)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={styles.cartFooter}>
          <div style={styles.cartTotalRow}>
            <span>Total</span>
            <strong>${total}</strong>
          </div>
          <button style={styles.checkoutButton} onClick={onCheckout} disabled={!cartItems.length}>
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckoutModal({ cartItems, total, isOpen, onClose, onBackToCart }) {
  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.checkoutCard}>
        <div style={styles.cartHeader}>
          <div>
            <div style={styles.playerLabel}>Checkout</div>
            <div style={styles.cartTitle}>Complete Your Order</div>
          </div>
          <button style={styles.playerCloseButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div style={styles.checkoutGrid}>
          <div style={styles.checkoutForm}>
            <input style={styles.searchInput} placeholder="Full name" />
            <input style={styles.searchInput} placeholder="Email address" />
            <input style={styles.searchInput} placeholder="Artist name" />
            <input style={styles.searchInput} placeholder="Card number (demo)" />
            <div style={styles.checkoutRow}>
              <input style={styles.searchInput} placeholder="MM/YY" />
              <input style={styles.searchInput} placeholder="CVC" />
            </div>
            <button style={styles.checkoutButton}>Pay Now (Demo)</button>
            <button style={styles.backButton} onClick={onBackToCart}>
              Back To Cart
            </button>
          </div>

          <div style={styles.orderSummary}>
            <div style={styles.playerLabel}>Order Summary</div>
            {cartItems.map((item, index) => (
              <div key={`${item.beat.id}-${item.license.id}-${index}`} style={styles.summaryItem}>
                <div>
                  <div style={styles.cartItemTitle}>{item.beat.title}</div>
                  <div style={styles.cartItemLicense}>{item.license.name}</div>
                </div>
                <div style={styles.cartPrice}>${item.license.price}</div>
              </div>
            ))}
            <div style={styles.cartTotalRow}>
              <span>Total</span>
              <strong>${total}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [search, setSearch] = useState("");
  const [mood, setMood] = useState("All");
  const [activeBeatId, setActiveBeatId] = useState(null);
  const [nowPlayingTitle, setNowPlayingTitle] = useState("");
  const [heroImageError, setHeroImageError] = useState(false);
  const [aboutImageError, setAboutImageError] = useState(false);
  const [imageErrorMap, setImageErrorMap] = useState({});
  const [selectedBeat, setSelectedBeat] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const filteredBeats = useMemo(() => {
    return beats.filter((beat) => {
      const haystack = `${beat.title} ${beat.subtitle} ${beat.mood} ${beat.genre} ${beat.key} ${beat.artistType}`.toLowerCase();
      const matchesSearch = haystack.includes(search.toLowerCase());
      const matchesMood = mood === "All" ? true : beat.mood === mood;
      return matchesSearch && matchesMood;
    });
  }, [search, mood]);

  const painBeats = beats.filter((beat) => beat.mood === "Pain");
  const victoryBeats = beats.filter((beat) => beat.mood === "Victory");
  const exclusiveBeats = beats.filter((beat) => beat.exclusive).slice(0, 3);
  const activeBeat = beats.find((beat) => beat.id === activeBeatId) || null;
  const isPlaying = !!audioRef.current && !audioRef.current.paused && activeBeatId !== null;
  const cartTotal = cartItems.reduce((sum, item) => sum + item.license.price, 0);

  function onImageError(id) {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }));
  }

  function handleAddToCart(beat, license) {
    setCartItems((prev) => [...prev, { beat, license }]);
    setCartOpen(true);
  }

  function handleRemoveFromCart(index) {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  }

  function handleOpenCheckout() {
    setCartOpen(false);
    setCheckoutOpen(true);
  }

  function handleCloseCheckout() {
    setCheckoutOpen(false);
  }

  function handleBackToCart() {
    setCheckoutOpen(false);
    setCartOpen(true);
  }

  function handleTogglePlay(beat) {
    if (activeBeatId === beat.id && audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setNowPlayingTitle(`${beat.title} — ${beat.subtitle}`);
          })
          .catch(() => {
            alert(`Unable to play preview: ${beat.preview}`);
          });
      } else {
        audioRef.current.pause();
      }
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(beat.preview);
    audioRef.current = audio;
    setActiveBeatId(beat.id);
    setNowPlayingTitle(`${beat.title} — ${beat.subtitle}`);
    setCurrentTime(0);
    setDuration(0);

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration || 0);
    });

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime || 0);
      setDuration(audio.duration || 0);
    });

    audio.play().catch(() => {
      alert(`Add this preview file to public/audio: ${beat.preview}`);
      setActiveBeatId(null);
      setNowPlayingTitle("");
      setCurrentTime(0);
      setDuration(0);
    });

    audio.onended = () => {
      setActiveBeatId(null);
      setNowPlayingTitle("");
      setCurrentTime(0);
      setDuration(0);
      audioRef.current = null;
    };
  }

  function handleClosePlayer() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setActiveBeatId(null);
    setNowPlayingTitle("");
    setCurrentTime(0);
    setDuration(0);
  }

  function handleSeek(value) {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  }

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.heroGlowOne} />
        <div style={styles.heroGlowTwo} />

        <div style={styles.nav}>
          <div>
            <div style={styles.navSmall}>UNDERGROUND ELITE</div>
            <div style={styles.logo}>BIG TY BEATS</div>
          </div>
          <div style={styles.navActions}>
            <button style={styles.cartNavButton} onClick={() => setCartOpen(true)}>
              Cart ({cartItems.length})
            </button>
            <button style={styles.navButton}>Enter The Sound</button>
          </div>
        </div>

        <div style={styles.heroGrid}>
          <div>
            <div style={styles.heroPill}>SOUNDTRACK FOR PAIN AND VICTORY</div>
            <h1 style={styles.heroTitle}>
              Underground cinematic production for artists building legacy.
            </h1>
            <p style={styles.heroText}>
              Premium beat store concept for rappers and melodic artists who want real emotion, pressure, and breakthrough records.
            </p>

            <div style={styles.heroButtons}>
              <button style={styles.primaryButton}>Explore Beats</button>
              <button style={styles.secondaryButton}>Hear Signature Sound</button>
            </div>

            <div style={styles.trustRow}>
              <span>Instant licensing</span>
              <span>Studio quality</span>
              <span>Exclusive ownership</span>
            </div>

            <div style={styles.nowPlayingBox}>
              <div style={styles.smallMuted}>Preview Status</div>
              <div style={styles.nowPlayingTitle}>{nowPlayingTitle || "No beat selected"}</div>
              <div style={{ ...styles.smallMuted, marginTop: 6 }}>
                {activeBeat ? (isPlaying ? "Playing now" : "Paused") : "Select any beat card to start preview"}
              </div>
            </div>
          </div>

          <div style={styles.heroImageBox}>
            <div style={styles.heroImageInner}>
              <div style={styles.heroImageLabelRow}>
                <span style={styles.infoBadge}>Producer Image</span>
                <span style={styles.goldBadge}>BIG TY</span>
              </div>
              {!heroImageError ? (
                <img
                  src={producerImage}
                  alt="BIG TY producer portrait"
                  style={styles.heroRealImage}
                  onError={() => setHeroImageError(true)}
                />
              ) : (
                <div style={styles.heroImagePlaceholder}>ADD YOUR PHOTO AS public/producer-photo.jpg</div>
              )}
              <WaveBars />
            </div>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <SectionTitle
          eyebrow="SIGNATURE SOUND"
          title="Curated records built for real stories."
          text="These are your strongest hero beats. Pain. Reflection. Power. Triumph."
        />
        <div style={styles.grid3}>
          {beats.map((beat) => (
            <BeatCard
              key={beat.id}
              beat={beat}
              activeBeatId={activeBeatId}
              onTogglePlay={handleTogglePlay}
              imageErrorMap={imageErrorMap}
              onImageError={onImageError}
              onOpenLicenses={setSelectedBeat}
              onQuickAdd={handleAddToCart}
            />
          ))}
        </div>
      </section>

      <section style={styles.sectionDark}>
        <SectionTitle
          eyebrow="BEAT STORE"
          title="Discover the sound that matches your story."
          text="Search by title, mood, genre, and artist lane."
        />

        <div style={styles.filterBox}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search beats, mood, genre, key..."
            style={styles.searchInput}
          />

          <div style={styles.moodButtons}>
            {["All", "Pain", "Victory"].map((item) => (
              <button
                key={item}
                onClick={() => setMood(item)}
                style={{
                  ...styles.moodButton,
                  ...(mood === item ? styles.moodButtonActive : {}),
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.grid3}>
          {filteredBeats.map((beat) => (
            <BeatCard
              key={beat.id}
              beat={beat}
              activeBeatId={activeBeatId}
              onTogglePlay={handleTogglePlay}
              imageErrorMap={imageErrorMap}
              onImageError={onImageError}
              onOpenLicenses={setSelectedBeat}
              onQuickAdd={handleAddToCart}
            />
          ))}
        </div>
      </section>

      <section style={styles.sectionTwoCol}>
        <div>
          <SectionTitle
            eyebrow="PAIN COLLECTION"
            title="Built for struggle, honesty, and emotional depth."
            text="This is your strongest emotional lane."
          />
          <div style={styles.grid2}>
            {painBeats.map((beat) => (
              <BeatCard
                key={beat.id}
                beat={beat}
                activeBeatId={activeBeatId}
                onTogglePlay={handleTogglePlay}
                imageErrorMap={imageErrorMap}
                onImageError={onImageError}
                onOpenLicenses={setSelectedBeat}
                onQuickAdd={handleAddToCart}
              />
            ))}
          </div>
        </div>

        <div>
          <SectionTitle
            eyebrow="VICTORY COLLECTION"
            title="Records for ambition, pressure, and breakthrough moments."
            text="This lane should feel like elevation and forward motion."
          />
          <div style={styles.grid2}>
            {victoryBeats.map((beat) => (
              <BeatCard
                key={beat.id}
                beat={beat}
                activeBeatId={activeBeatId}
                onTogglePlay={handleTogglePlay}
                imageErrorMap={imageErrorMap}
                onImageError={onImageError}
                onOpenLicenses={setSelectedBeat}
                onQuickAdd={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <section style={styles.sectionDark}>
        <SectionTitle
          eyebrow="OWN THE RECORD"
          title="Exclusive records for artists defining their era."
          text="Only show a few. Scarcity increases value."
        />

        <div style={styles.grid3}>
          {exclusiveBeats.map((beat) => (
            <div key={beat.id} style={styles.exclusiveCard}>
              <div style={styles.exclusiveImage}>
                <div style={styles.exclusiveImageInner}>
                  <span style={styles.goldBadge}>Exclusive Available</span>
                  <div>
                    <div style={styles.cardTitle}>{beat.title}</div>
                    <div style={styles.cardSubtitle}>{beat.subtitle}</div>
                    <p style={{ ...styles.sectionText, marginTop: 12, textAlign: "left" }}>
                      Own the sound that defines your breakthrough moment.
                    </p>
                  </div>
                </div>
              </div>

              <div style={styles.cardContent}>
                <div style={styles.exclusivePrices}>
                  <div style={styles.exclusivePriceBox}>
                    <div style={styles.smallMuted}>Basic</div>
                    <div style={styles.exclusivePrice}>$300</div>
                  </div>
                  <div style={styles.exclusivePriceBox}>
                    <div style={styles.smallMuted}>Premium</div>
                    <div style={styles.exclusivePrice}>$600</div>
                  </div>
                  <div style={styles.exclusivePriceBox}>
                    <div style={styles.smallMuted}>Elite</div>
                    <div style={styles.exclusivePrice}>$1000</div>
                  </div>
                </div>

                <button style={styles.goldButton}>Request Exclusive</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <SectionTitle
          eyebrow="BUNDLES"
          title="Turn catalog depth into higher order value."
          text="Frame these like artist progression packs, not cheap discounts."
        />

        <div style={styles.grid4}>
          {bundles.map((bundle) => (
            <div key={bundle.name} style={styles.bundleCard}>
              <div style={styles.infoBadge}>{bundle.beats} Beats</div>
              <h3 style={{ ...styles.cardTitle, marginTop: 18 }}>{bundle.name}</h3>
              <p style={{ ...styles.sectionText, textAlign: "left", marginTop: 14 }}>{bundle.text}</p>
              <div style={{ marginTop: 28 }}>
                <div style={styles.startingAt}>Bundle Price</div>
                <div style={styles.bundlePrice}>${bundle.price}</div>
              </div>
              <button style={{ ...styles.primaryButton, width: "100%", marginTop: 20 }}>Get Bundle</button>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.sectionDark}>
        <div style={styles.aboutGrid}>
          {!aboutImageError ? (
            <img
              src={producerImage}
              alt="BIG TY producer portrait"
              style={styles.aboutRealImage}
              onError={() => setAboutImageError(true)}
            />
          ) : (
            <div style={styles.aboutImage}>ADD YOUR PRODUCER PHOTO TO public/producer-photo.jpg</div>
          )}

          <div>
            <div style={styles.eyebrow}>PRODUCER STORY</div>
            <h2 style={styles.sectionTitle}>Built in FL Studio. Directed by pain, pressure, and purpose.</h2>
            <p style={{ ...styles.sectionText, textAlign: "left", maxWidth: 700 }}>
              BIG TY BEATS creates underground cinematic production for rappers and melodic artists with real stories.
              The sound is built for pain records, pressure records, and victory records that feel timeless.
            </p>

            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>150+</div>
                <div style={styles.smallMuted}>Beats ready to scale</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>Pain + Victory</div>
                <div style={styles.smallMuted}>Core sound identity</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>Underground Elite</div>
                <div style={styles.smallMuted}>Brand positioning</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StickyPlayer
        activeBeat={activeBeat}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onTogglePlay={handleTogglePlay}
        onClose={handleClosePlayer}
        onSeek={handleSeek}
      />

      <CartDrawer
        cartItems={cartItems}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onRemove={handleRemoveFromCart}
        onCheckout={handleOpenCheckout}
        total={cartTotal}
      />

      <LicenseModal
        beat={selectedBeat}
        onClose={() => setSelectedBeat(null)}
        onAddToCart={handleAddToCart}
      />

      <CheckoutModal
        cartItems={cartItems}
        total={cartTotal}
        isOpen={checkoutOpen}
        onClose={handleCloseCheckout}
        onBackToCart={handleBackToCart}
      />
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#070707",
    color: "#e4e4e7",
    fontFamily: "Arial, Helvetica, sans-serif",
  },

  nav: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "24px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
  },
  navSmall: {
    fontSize: 11,
    color: "#a1a1aa",
    letterSpacing: "0.35em",
    marginBottom: 6,
  },
  logo: {
    fontSize: 24,
    fontWeight: 800,
    color: "#fff",
    letterSpacing: "0.22em",
  },
  navActions: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    flexWrap: "wrap",
  },
  navButton: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "12px 18px",
    fontWeight: 700,
    cursor: "pointer",
  },
  cartNavButton: {
    background: "transparent",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 12,
    padding: "12px 18px",
    fontWeight: 700,
    cursor: "pointer",
  },

  hero: {
    position: "relative",
    overflow: "hidden",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    background:
      "radial-gradient(circle at top, rgba(185,28,28,0.18), transparent 30%), radial-gradient(circle at bottom right, rgba(249,115,22,0.12), transparent 25%), #070707",
  },
  heroGlowOne: {
    position: "absolute",
    width: 400,
    height: 400,
    background: "rgba(220,38,38,0.16)",
    filter: "blur(90px)",
    borderRadius: "50%",
    top: -100,
    right: -100,
  },
  heroGlowTwo: {
    position: "absolute",
    width: 300,
    height: 300,
    background: "rgba(249,115,22,0.10)",
    filter: "blur(90px)",
    borderRadius: "50%",
    bottom: -80,
    left: -80,
  },
  heroGrid: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "40px 20px 90px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 40,
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },
  heroPill: {
    display: "inline-block",
    padding: "10px 16px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.04)",
    fontSize: 12,
    color: "#d4d4d8",
    letterSpacing: "0.24em",
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: "clamp(42px, 7vw, 76px)",
    lineHeight: 1,
    color: "#fff",
    fontWeight: 900,
    margin: 0,
    maxWidth: 760,
  },
  heroText: {
    marginTop: 24,
    fontSize: 20,
    lineHeight: 1.7,
    color: "#a1a1aa",
    maxWidth: 620,
  },
  heroButtons: {
    display: "flex",
    flexWrap: "wrap",
    gap: 14,
    marginTop: 28,
  },
  trustRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 24,
    marginTop: 24,
    color: "#71717a",
    fontSize: 14,
  },
  nowPlayingBox: {
    marginTop: 24,
    padding: 16,
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(0,0,0,0.3)",
    maxWidth: 480,
  },
  nowPlayingTitle: {
    color: "#fff",
    fontWeight: 700,
    marginTop: 6,
  },
  primaryButton: {
    background: "#ffffff",
    color: "#000000",
    border: "none",
    borderRadius: 14,
    padding: "14px 22px",
    fontWeight: 800,
    cursor: "pointer",
  },
  secondaryButton: {
    background: "transparent",
    color: "#ffffff",
    border: "1px solid #3f3f46",
    borderRadius: 14,
    padding: "14px 22px",
    fontWeight: 800,
    cursor: "pointer",
  },
  goldButton: {
    width: "100%",
    background: "#fbbf24",
    color: "#000",
    border: "none",
    borderRadius: 14,
    padding: "14px 18px",
    fontWeight: 800,
    cursor: "pointer",
    marginTop: 18,
  },

  heroImageBox: {
    borderRadius: 32,
    padding: 12,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "linear-gradient(135deg, #121212, #090909)",
    boxShadow: "0 30px 80px rgba(60,0,0,0.35)",
  },
  heroImageInner: {
    borderRadius: 24,
    padding: 20,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(0,0,0,0.34)",
  },
  heroImageLabelRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 16,
  },
  heroImagePlaceholder: {
    minHeight: 380,
    borderRadius: 24,
    border: "1px solid rgba(255,255,255,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 20,
    color: "#a1a1aa",
    background: "linear-gradient(145deg, #1a1a1a, #0d0d0d)",
    marginBottom: 18,
    fontWeight: 700,
  },
  heroRealImage: {
    width: "100%",
    height: 420,
    objectFit: "cover",
    borderRadius: 24,
    border: "1px solid rgba(255,255,255,0.08)",
    marginBottom: 18,
    display: "block",
  },

  section: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "90px 20px",
  },
  sectionDark: {
    padding: "90px 20px",
    background: "rgba(10,10,10,0.92)",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  sectionTwoCol: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "90px 20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 50,
  },
  sectionTitleWrap: {
    maxWidth: 760,
    margin: "0 auto 42px",
    textAlign: "center",
  },
  eyebrow: {
    fontSize: 12,
    color: "#f87171",
    letterSpacing: "0.4em",
    marginBottom: 14,
  },
  sectionTitle: {
    margin: 0,
    fontSize: "clamp(30px, 4vw, 56px)",
    color: "#fff",
    lineHeight: 1.1,
    fontWeight: 900,
  },
  sectionText: {
    color: "#a1a1aa",
    fontSize: 17,
    lineHeight: 1.8,
    marginTop: 16,
    textAlign: "center",
  },

  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 22,
  },
  grid3: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 24,
  },
  grid4: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 24,
  },

  filterBox: {
    maxWidth: 1200,
    margin: "0 auto 34px",
    padding: 20,
    borderRadius: 24,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(0,0,0,0.35)",
  },
  searchInput: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 14,
    border: "1px solid #27272a",
    background: "#09090b",
    color: "#fff",
    outline: "none",
    fontSize: 16,
    marginBottom: 16,
    boxSizing: "border-box",
  },
  moodButtons: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  moodButton: {
    padding: "10px 16px",
    borderRadius: 12,
    border: "1px solid #27272a",
    background: "#18181b",
    color: "#d4d4d8",
    cursor: "pointer",
    fontWeight: 700,
  },
  moodButtonActive: {
    background: "#dc2626",
    borderColor: "#dc2626",
    color: "#fff",
  },

  card: {
    borderRadius: 24,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(10,10,10,0.82)",
  },
  cardImage: {
    position: "relative",
    aspectRatio: "1 / 1",
    background:
      "radial-gradient(circle at top, rgba(239,68,68,0.28), transparent 42%), linear-gradient(135deg, #1a1a1a, #0a0a0a)",
  },
  cardRealImage: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  cardFallbackImage: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#a1a1aa",
    fontWeight: 700,
    textAlign: "center",
    padding: 20,
  },
  cardOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.58))",
  },
  cardTopRow: {
    position: "absolute",
    top: 12,
    left: 12,
    right: 12,
    display: "flex",
    justifyContent: "space-between",
    gap: 8,
    flexWrap: "wrap",
  },
  cardBottom: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    display: "flex",
    alignItems: "end",
    justifyContent: "space-between",
    gap: 12,
  },
  cardTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: 800,
    lineHeight: 1.1,
  },
  cardSubtitle: {
    marginTop: 6,
    color: "#a1a1aa",
    fontSize: 14,
  },
  playButton: {
    width: 46,
    height: 46,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    cursor: "pointer",
    fontSize: 16,
  },
  cardContent: {
    padding: 18,
  },
  badgeRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginTop: 16,
  },
  tag: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    background: "#dc2626",
    color: "#fff",
    fontSize: 12,
    fontWeight: 700,
  },
  exclusiveTag: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(251,191,36,0.25)",
    background: "rgba(251,191,36,0.10)",
    color: "#fcd34d",
    fontSize: 12,
    fontWeight: 700,
  },
  infoBadge: {
    display: "inline-block",
    padding: "7px 10px",
    borderRadius: 999,
    background: "#18181b",
    color: "#d4d4d8",
    fontSize: 12,
    border: "1px solid rgba(255,255,255,0.06)",
  },
  goldBadge: {
    display: "inline-block",
    padding: "7px 10px",
    borderRadius: 999,
    background: "rgba(251,191,36,0.10)",
    color: "#fcd34d",
    fontSize: 12,
    border: "1px solid rgba(251,191,36,0.25)",
    fontWeight: 700,
  },
  startingAt: {
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "#71717a",
    marginBottom: 4,
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    gap: 12,
    marginTop: 18,
  },
  price: {
    fontSize: 30,
    fontWeight: 900,
    color: "#fff",
  },
  cardActionButtons: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    flexWrap: "wrap",
  },
  secondaryMiniButton: {
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 12,
    background: "transparent",
    color: "#fff",
    padding: "12px 14px",
    fontWeight: 700,
    cursor: "pointer",
  },
  addButton: {
    border: "none",
    borderRadius: 12,
    background: "#fff",
    color: "#000",
    padding: "12px 18px",
    fontWeight: 800,
    cursor: "pointer",
  },

  exclusiveCard: {
    borderRadius: 24,
    overflow: "hidden",
    border: "1px solid rgba(251,191,36,0.18)",
    background: "rgba(10,10,10,0.82)",
  },
  exclusiveImage: {
    aspectRatio: "4 / 3",
    padding: 16,
    background:
      "radial-gradient(circle at top, rgba(251,191,36,0.15), transparent 25%), linear-gradient(135deg, #171717, #0a0a0a)",
  },
  exclusiveImageInner: {
    height: "100%",
    borderRadius: 22,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(0,0,0,0.3)",
    padding: 18,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  exclusivePrices: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10,
  },
  exclusivePriceBox: {
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(0,0,0,0.3)",
    padding: 14,
    textAlign: "center",
  },
  exclusivePrice: {
    color: "#fff",
    fontWeight: 900,
    fontSize: 22,
    marginTop: 6,
  },

  bundleCard: {
    borderRadius: 24,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(10,10,10,0.82)",
    padding: 24,
  },
  bundlePrice: {
    fontSize: 42,
    fontWeight: 900,
    color: "#fff",
    marginTop: 6,
  },

  aboutGrid: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 40,
    alignItems: "center",
  },
  aboutImage: {
    minHeight: 520,
    borderRadius: 28,
    border: "1px solid rgba(255,255,255,0.08)",
    background:
      "radial-gradient(circle at top, rgba(239,68,68,0.16), transparent 26%), linear-gradient(150deg, #1b1b1b, #0d0d0d)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    textAlign: "center",
    color: "#a1a1aa",
    fontWeight: 700,
  },
  aboutRealImage: {
    width: "100%",
    minHeight: 520,
    objectFit: "cover",
    borderRadius: 28,
    border: "1px solid rgba(255,255,255,0.08)",
    display: "block",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 16,
    marginTop: 26,
  },
  statCard: {
    borderRadius: 22,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(0,0,0,0.3)",
    padding: 18,
  },
  statNumber: {
    color: "#fff",
    fontWeight: 900,
    fontSize: 22,
    marginBottom: 8,
  },
  smallMuted: {
    color: "#a1a1aa",
    fontSize: 13,
  },

  playerBarWrap: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    padding: "12px 12px 16px",
    background: "linear-gradient(180deg, rgba(7,7,7,0), rgba(7,7,7,0.85) 35%, rgba(7,7,7,0.98) 100%)",
  },
  playerBar: {
    maxWidth: 1200,
    margin: "0 auto",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(10,10,10,0.95)",
    borderRadius: 22,
    padding: 14,
    display: "grid",
    gridTemplateColumns: "minmax(220px, 1fr) minmax(260px, 1.4fr) auto",
    gap: 16,
    alignItems: "center",
    boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
  },
  playerMeta: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    minWidth: 0,
  },
  playerArtWrap: {
    width: 58,
    height: 58,
    borderRadius: 14,
    overflow: "hidden",
    background: "linear-gradient(135deg, #1a1a1a, #0a0a0a)",
    border: "1px solid rgba(255,255,255,0.08)",
    flexShrink: 0,
  },
  playerArt: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  playerLabel: {
    color: "#71717a",
    fontSize: 11,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  playerTitle: {
    color: "#fff",
    fontWeight: 800,
    fontSize: 18,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  playerSubtitle: {
    color: "#a1a1aa",
    fontSize: 13,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginTop: 2,
  },
  playerCenter: {
    minWidth: 0,
  },
  playerControls: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  playerMainButton: {
    width: 46,
    height: 46,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "#dc2626",
    color: "#fff",
    fontWeight: 800,
    cursor: "pointer",
    flexShrink: 0,
  },
  playerTime: {
    color: "#d4d4d8",
    fontSize: 13,
    fontWeight: 700,
  },
  playerProgressRow: {
    width: "100%",
  },
  playerRange: {
    width: "100%",
    height: 8,
    borderRadius: 999,
    appearance: "none",
    outline: "none",
    cursor: "pointer",
  },
  playerRight: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  playerBadge: {
    display: "inline-block",
    padding: "8px 10px",
    borderRadius: 999,
    background: "#18181b",
    color: "#d4d4d8",
    fontSize: 12,
    border: "1px solid rgba(255,255,255,0.06)",
  },
  playerCloseButton: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "transparent",
    color: "#fff",
    cursor: "pointer",
  },

  cartDrawerWrap: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    maxWidth: 420,
    zIndex: 1200,
    padding: 16,
    pointerEvents: "none",
  },
  cartDrawer: {
    height: "100%",
    background: "rgba(10,10,10,0.98)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 24,
    boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    pointerEvents: "auto",
  },
  cartHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    padding: 20,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  cartTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: 900,
  },
  cartList: {
    flex: 1,
    overflowY: "auto",
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  emptyCart: {
    color: "#a1a1aa",
    textAlign: "center",
    marginTop: 30,
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    padding: 14,
    borderRadius: 18,
    background: "#111113",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  cartItemTitle: {
    color: "#fff",
    fontWeight: 800,
    fontSize: 16,
  },
  cartItemSubtitle: {
    color: "#a1a1aa",
    fontSize: 13,
    marginTop: 4,
  },
  cartItemLicense: {
    color: "#f97316",
    fontSize: 13,
    fontWeight: 700,
    marginTop: 6,
  },
  cartItemRight: {
    textAlign: "right",
  },
  cartPrice: {
    color: "#fff",
    fontWeight: 900,
    fontSize: 18,
  },
  removeButton: {
    marginTop: 10,
    border: "none",
    background: "transparent",
    color: "#f87171",
    cursor: "pointer",
    fontWeight: 700,
  },
  cartFooter: {
    padding: 20,
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  cartTotalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff",
    fontSize: 18,
    marginBottom: 16,
  },
  checkoutButton: {
    width: "100%",
    background: "#ffffff",
    color: "#000000",
    border: "none",
    borderRadius: 14,
    padding: "14px 18px",
    fontWeight: 800,
    cursor: "pointer",
  },
  backButton: {
    width: "100%",
    background: "transparent",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 14,
    padding: "14px 18px",
    fontWeight: 800,
    cursor: "pointer",
    marginTop: 10,
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.72)",
    zIndex: 1300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 920,
    background: "#0b0b0d",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 28,
    overflow: "hidden",
  },
  licenseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
    padding: 20,
  },
  licenseCard: {
    borderRadius: 20,
    background: "#111113",
    border: "1px solid rgba(255,255,255,0.06)",
    padding: 18,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 16,
  },
  licenseBottom: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  licensePrice: {
    color: "#fff",
    fontSize: 30,
    fontWeight: 900,
  },

  checkoutCard: {
    width: "100%",
    maxWidth: 980,
    background: "#0b0b0d",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 28,
    overflow: "hidden",
  },
  checkoutGrid: {
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: 0,
  },
  checkoutForm: {
    padding: 20,
    borderRight: "1px solid rgba(255,255,255,0.08)",
  },
  checkoutRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },
  orderSummary: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  summaryItem: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    padding: 12,
    borderRadius: 16,
    background: "#111113",
    border: "1px solid rgba(255,255,255,0.06)",
  },
};

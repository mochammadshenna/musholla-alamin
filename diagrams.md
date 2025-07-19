# Mosque Website - System Architecture Diagrams

## 1. Flow Control Diagram

```mermaid
flowchart TD
    A[User Visits Website] --> B{Device Type?}
    B -->|Mobile| C[Mobile Layout]
    B -->|Desktop| D[Desktop Layout]
    
    C --> E[Request Location]
    D --> E
    
    E --> F{Location Permission?}
    F -->|Granted| G[Get GPS Coordinates]
    F -->|Denied| H[Use Default Location]
    
    G --> I[Fetch Prayer Times API]
    H --> I
    
    I --> J{API Response?}
    J -->|Success| K[Display Prayer Times]
    J -->|Error| L[Show Error Message]
    
    K --> M[Highlight Current Prayer]
    M --> N[Start Next Prayer Countdown]
    
    L --> O[Retry Button]
    O --> I
    
    N --> P{User Interaction?}
    P -->|Program Click| Q[Navigate to Programs]
    P -->|Donation Click| R[Open Donation Modal]
    P -->|Prayer Notification| S[Show Prayer Alert]
    
    Q --> T[Load Program Details]
    R --> U[Payment Integration]
    S --> V[Audio/Visual Notification]
    
    style A fill:#e1f5fe
    style K fill:#c8e6c9
    style L fill:#ffcdd2
    style M fill:#fff3c4
    style N fill:#f3e5f5
```

## 2. Data Lineage Diagram

```mermaid
flowchart LR
    subgraph "External APIs"
        A[IslamicFinder API]
        B[Geolocation API]
        C[Google Maps API]
    end
    
    subgraph "Data Processing"
        D[Location Service]
        E[Prayer Time Service]
        F[Date/Time Formatter]
        G[Cache Manager]
    end
    
    subgraph "State Management"
        H[React Query Cache]
        I[Local Storage]
        J[Component State]
    end
    
    subgraph "UI Components"
        K[Prayer Times Card]
        L[Location Selector]
        M[Countdown Timer]
        N[Notification System]
    end
    
    subgraph "User Preferences"
        O[Notification Settings]
        P[Preferred Location]
        Q[Language Preference]
    end
    
    A -->|Prayer Data| E
    B -->|Coordinates| D
    C -->|Location Names| D
    
    D -->|Processed Location| E
    E -->|Formatted Times| F
    F -->|Clean Data| G
    
    G -->|Cached Data| H
    E -->|Backup Data| I
    H -->|State Updates| J
    
    J -->|Prayer Times| K
    J -->|Location Data| L
    J -->|Time Data| M
    J -->|Alert Data| N
    
    O -->|Settings| N
    P -->|Location| D
    Q -->|Language| F
    
    I -.->|Persist| O
    I -.->|Persist| P
    I -.->|Persist| Q
    
    style A fill:#ffeb3b
    style E fill:#4caf50
    style H fill:#2196f3
    style K fill:#9c27b0
```

## 3. Component Structure Diagram

```mermaid
graph TD
    subgraph "App Root"
        A[App.tsx]
    end
    
    subgraph "Layout Components"
        B[Header.tsx]
        C[Navigation.tsx]
        D[Footer.tsx]
        E[Sidebar.tsx]
    end
    
    subgraph "Page Components"
        F[HomePage.tsx]
        G[ProgramsPage.tsx]
        H[AboutPage.tsx]
        I[ContactPage.tsx]
    end
    
    subgraph "Feature Components"
        J[PrayerTimes/]
        K[Programs/]
        L[Donations/]
        M[Events/]
    end
    
    subgraph "PrayerTimes Feature"
        N[PrayerTimesContainer.tsx]
        O[PrayerCard.tsx]
        P[CurrentPrayerHighlight.tsx]
        Q[NextPrayerCountdown.tsx]
        R[LocationSelector.tsx]
    end
    
    subgraph "Programs Feature"
        S[ProgramsGrid.tsx]
        T[ProgramCard.tsx]
        U[TPA.tsx]
        V[Kajian.tsx]
        W[Wakaf.tsx]
        X[Tahsin.tsx]
    end
    
    subgraph "Donations Feature"
        Y[DonationContainer.tsx]
        Z[DonationCard.tsx]
        AA[PaymentModal.tsx]
        BB[ProgressBar.tsx]
    end
    
    subgraph "Common Components"
        CC[Hero.tsx]
        DD[Card.tsx]
        EE[Button.tsx]
        FF[Modal.tsx]
        GG[Loading.tsx]
        HH[ErrorBoundary.tsx]
    end
    
    subgraph "Hooks & Services"
        II[usePrayerTimes.ts]
        JJ[useLocation.ts]
        KK[useLocalStorage.ts]
        LL[prayerTimesAPI.ts]
        MM[locationAPI.ts]
    end
    
    A --> B
    A --> F
    A --> D
    
    B --> C
    B --> E
    
    F --> CC
    F --> J
    F --> K
    F --> L
    
    J --> N
    N --> O
    N --> P
    N --> Q
    N --> R
    
    K --> S
    S --> T
    S --> U
    S --> V
    S --> W
    S --> X
    
    L --> Y
    Y --> Z
    Y --> AA
    Y --> BB
    
    O --> DD
    O --> EE
    AA --> FF
    N --> GG
    A --> HH
    
    N --> II
    R --> JJ
    N --> KK
    II --> LL
    JJ --> MM
    
    style A fill:#e3f2fd
    style J fill:#f3e5f5
    style K fill:#e8f5e8
    style L fill:#fff3e0
    style II fill:#fce4ec
    style LL fill:#f1f8e9
```

## 4. User Journey Flow

```mermaid
journey
    title Mosque Website User Journey
    section First Visit
      Open Website      : 5: User
      View Hero Section : 4: User
      See Prayer Times  : 5: User
      Browse Programs   : 4: User
      
    section Prayer Times Interaction
      Allow Location    : 3: User
      View Current Prayer: 5: User
      Set Notifications : 4: User
      Check Next Prayer : 5: User
      
    section Program Exploration
      Click TPA Program : 4: User
      Read Description  : 4: User
      Contact for Info  : 3: User
      Browse Other Programs: 4: User
      
    section Donation Process
      View Donation Cards: 4: User
      Select Cause      : 4: User
      Enter Amount      : 3: User
      Complete Payment  : 5: User
      
    section Return Visit
      Quick Prayer Check: 5: User
      Check Events      : 4: User
      Update Preferences: 3: User
      Share with Friends: 4: User
```

## 5. API Integration Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Component
    participant H as Hook
    participant S as Service
    participant A as API
    participant Cache as Cache
    
    U->>C: Visits page
    C->>H: usePrayerTimes()
    H->>Cache: Check cache
    
    alt Cache hit
        Cache-->>H: Return cached data
        H-->>C: Cached prayer times
    else Cache miss
        H->>S: fetchPrayerTimes()
        S->>A: GET /prayer-times
        A-->>S: Prayer data
        S->>S: Transform data
        S-->>H: Formatted times
        H->>Cache: Store in cache
        H-->>C: Fresh prayer times
    end
    
    C->>C: Render prayer cards
    C-->>U: Display times
    
    Note over H,Cache: Auto-refresh every hour
    
    H->>S: Refresh timer
    S->>A: GET /prayer-times
    A-->>S: Updated data
    S-->>H: New times
    H->>Cache: Update cache
    H-->>C: Updated times
    C-->>U: Smooth update
```

## 6. Responsive Breakpoint Strategy

```mermaid
graph LR
    subgraph "Device Breakpoints"
        A[Mobile<br/>320px-767px]
        B[Tablet<br/>768px-1023px]
        C[Desktop<br/>1024px-1439px]
        D[Large Desktop<br/>1440px+]
    end
    
    subgraph "Layout Adaptations"
        E[Single Column<br/>Stack Components]
        F[Two Columns<br/>Side-by-side]
        G[Three Columns<br/>Grid Layout]
        H[Four Columns<br/>Extended Grid]
    end
    
    subgraph "Navigation Changes"
        I[Hamburger Menu<br/>Drawer]
        J[Tabs<br/>Horizontal]
        K[Full Navigation<br/>Header Bar]
        L[Mega Menu<br/>Dropdowns]
    end
    
    subgraph "Prayer Times Display"
        M[Vertical Cards<br/>Full Width]
        N[2x3 Grid<br/>Compact Cards]
        O[Horizontal Row<br/>Timeline View]
        P[Dashboard<br/>Multi-section]
    end
    
    A --> E
    A --> I
    A --> M
    
    B --> F
    B --> J
    B --> N
    
    C --> G
    C --> K
    C --> O
    
    D --> H
    D --> L
    D --> P
    
    style A fill:#ffcdd2
    style B fill:#f8bbd9
    style C fill:#e1bee7
    style D fill:#c5cae9
```

## Color Scheme for Diagrams

The diagrams use a consistent color scheme reflecting the mosque website design:

- **Light Blue (#e3f2fd)**: Main components and containers
- **Green (#e8f5e8)**: Data flow and services
- **Purple (#f3e5f5)**: Features and functionality
- **Orange (#fff3e0)**: User interactions and external APIs
- **Pink (#fce4ec)**: Hooks and state management
- **Yellow (#ffeb3b)**: External data sources

This color coding helps developers quickly identify component types and data flow patterns throughout the system architecture.
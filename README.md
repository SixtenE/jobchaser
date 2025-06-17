# U07 Jobchaser

[jobchaser live demo](https://jobchaser-production.up.railway.app/)

- ## Vecka 1

  ### Allmänt om ramverket react: Hur/Varför uppkom det? Vad är centralt i react?

  React skapades av Facebook för att hantera användargränssnitt på ett effektivt sätt. Centralt i react är komponentbaserad arkitektur, virtuell DOM och en reaktiv programmeringsmodell.

### Vad är JSX?

    JSX är en syntax som låter dig skriva HTML-liknande kod i JavaScript. Det används i react för att beskriva hur UI-komponenter ska se ut.

### Vad är en komponent?

    En reactkomponent är en återanvändbar del av UIn som kan ha egen state och logik.

### Vad är props?

    Props i react är ett sätt att skicka data från en komponent till en annan. De är immutable och används för att konfigurera komponenter.

### Vad menas med one-way-dataflow?

    One-way-dataflow i react innebär att data flödar i en riktning, från föräldrakomponenter till barnkomponenter. Detta gör det enklare att förstå och felsöka applikationens tillstånd.

### Hur kan man använda sig av konditionell rendering i React?

    Konditionell rendering i react innebär att man renderar olika komponenter eller element baserat på vissa villkor. Detta kan göras med hjälp av if-satser, ternary eller &&.

### Vad menas med en återanvändbar komponent?

    En återanvändbar komponent i react är en komponent som kan användas flera gånger i olika delar av applikationen utan att behöva duplicera kod.

- ## Vecka 2

### Vad är state i React?

    State i react är ett objekt som representerar komponentens interna tillstånd. Det kan ändras över tid och när det gör det, kommer komponenten att renderas om.

### Vad är det för skillnad mellan state och props?

    Skillnaden mellan state och props i react är att state är internt för en komponent och kan ändras, medan props är externa data som skickas till en komponent och är oföränderliga.

### Vad menas med en kontrollerad komponent i React?

    En kontrollerad komponent i react är en komponent vars värde styrs av state. Det innebär att alla ändringar i komponentens värde hanteras genom state.

### Vad är en callback handler?

    En callback handler i react är en funktion som anropas som svar på en händelse, till exempel när en knapp klickas. Den används för att hantera användarinteraktioner.

### Vad menas med "lifting state up"?

    Det innebär att flytta state från en barnkomponent till en föräldrakomponent för att dela data mellan flera komponenter.

### Vad är syftet med useEffect-hook i React?

    Syftet är att hantera side effects i komponenter tex hämta data eller manipulera DOM. useEffect körs efter att komponenten har renderats och kan även köras vid uppdateringar av state.

### Vad är syftet kring den s.k dependency-arrayen i useEffect?

    Den arrayen används för att säga vilka variabler som ska avgöra när useEffect ska köras om. Om arrayen är tom kommer useEffect endast att köras en gång när komponenten mountas.

- ## Vecka 3

### Vilka fördelar finns det med att använda NextJS? Nackdelar?

    Fördelar med Next är inbyggd routing med bla ssr och statiska rutter. Nackdelar är att det är ganska många funktioner som är specifika för Next och som funkar bäst på Vercel. En annan grej är att dev-servern kan fastna på min dator och då måste jag starta om den.

### Vad menas med Routing? På vilket sätt löser NextJS Routing v.s "vanliga React"?

    Routing innebär att navigera mellan olika sidor i en applikation. NextJS löser routing genom att använda filsystemet för att definiera rutter, vilket gör det enklare att skapa och hantera sidor jämfört med traditionell React-routing.

### Vad menas med Reacts ekosystem? Nämn några viktiga bibliotek i Reacts ekosystem?

    Reacts ekosystem är de olika bibliotek och verktyg som används tillsammans med React för att bygga applikationer. Några bibliotek är Redux för state management, React Router för routing, och react query för asynkron datahantering.

### Vad är syftet med useContext? Vilket problem med props löser den?

    Syftet med useContext är att dela data mellan komponenter utan att behöva skicka props genom varje nivå i komponentträdet. Det löser problemet med prop drilling som kan vara jobbigt ju fler komponenter man har.

- ## Vecka 4

### Vad är Redux Toolkit?

    Det är ett bibliotek som förenklar användningen av Redux som i sig är en global state manager.

### När, i vilka situationer vill man använda Redux Toolkit?

    Redux Toolkit är användbart i större applikationer där man har mycket state och logik. Det hjälper till att organisera koden och göra den mer hanterbar.

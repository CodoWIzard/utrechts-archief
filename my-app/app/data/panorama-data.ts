export interface PanoramaPage {
  id: string;
  catalogNumber: string;
  title: string;
  description: string;
  imageUrl: string;
  additionalInfo?: string;
  additionalImages?: {
    url: string;
    description: string;
  }[];
}

export const panoramaPages: PanoramaPage[] = [
  {
    "id": "page1",
    "catalogNumber": "135001",
    "title": "Titelblad Panorama van Utrecht",
    "description": "Afbeelding van de titelpagina van het Panorama van Utrecht, op de lithostenen getekend door J. Bos, gedrukt bij P.W. van de Weijer en in juli 1859 uitgegeven door de Wed. Herfkens en zoon.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/10AA76F512755EEF8B2AB912E7310E9D",
    "additionalInfo": "Het Panorama van Utrecht bestaat uit vier aaneengeplakte, zigzag gevouwen bladen met een totale lengte van 5,82 meter. Het panorama is een meterslange tekening van een rondwandeling om het centrum van Utrecht, met steeds wisselend uitzicht vanaf de singels. Het geeft een heel precies beeld van hoe de stad in 1859 er uitzag en het leuke is dat je ook het verloop van de seizoenen in de tekening terugziet.",
    "originalIndex": 0
  },
  {
    "id": "page2",
    "catalogNumber": "135002",
    "title": "Wittevrouwenbrug",
    "description": "Gezicht over de Wittevrouwenbrug in de Wittevrouwenstraat te Utrecht met het douanekantoor (de latere politiepost Wittevrouwen) en de Willemskazerne.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/C31712F4A3B15A4E8540206F7927AC9F"
  },
  {
    "id": "page3",
    "catalogNumber": "135003",
    "title": "Gevangenis Wolvenplein",
    "description": "Gezicht op de gevangenis aan het Wolvenplein te Utrecht op het vroegere bolwerk Wolvenburg, met rechts een huis op de afgegraven stadswal bij de Wolvenstraat.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/DB2381CB976854EFA3AC00047CD2D238"
  },
  {
    "id": "page4",
    "catalogNumber": "135004",
    "title": "Plompetorengracht",
    "description": "Gezicht op de uitmonding van de Plompetorengracht te Utrecht in de stadsbuitengracht, in het midden de bomen langs de Noorderkade en rechts een gedeelte van het Begijnebolwerk. Rechts wordt een overhaalschuitje voortgetrokken.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/5EFEB0981F685840A95F534163CC0649",
    "additionalImages": [
      {
        "url": "https://hetutrechtsarchief.nl/beeld/242D4A4C5CA4516E9DF926B2A2E7486E",
        "description": "Afbeelding van het overhaalschuitje over de Stadsbuitengracht ter hoogte van de Lange Smeestraat te Utrecht. Deze veerbootjes, die voetgangers van en naar de binnenstad vervoerden, werden in de loop van de 19e eeuw vervangen door vaste bruggen."
      }
    ]
  },
  {
    "id": "page5",
    "catalogNumber": "135005",
    "title": "Begijnebolwerk",
    "description": "Gezicht op het Begijnebolwerk te Utrecht.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/956865ED18175EC28A884B09136B8678",
    "additionalInfo": "Dit markeert het einde van het panorama van Utrecht uit 1859.",
    "additionalImages": [
      {
        "url": "/images/endpage.jpg",
        "description": "Einde panorama - Dit markeert het einde van het panorama van Utrecht uit 1859."
      }
    ]
  },
  {
    "id": "page6",
    "catalogNumber": "135006",
    "title": "Begijnebolwerk en Van Asch van Wijckskade",
    "description": "Gezicht op een gedeelte van het Begijnebolwerk (links) en de Van Asch van Wijckskade te Utrecht.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/1F575DA871D45951B614A952A0381D6D"
  },
  {
    "id": "page7",
    "catalogNumber": "135007",
    "title": "Van Asch van Wijckskade en Weerdbrug",
    "description": "Gezicht op de Van Asch van Wijckskade te Utrecht, de Weerdbarrière en de Weerdbrug en rechts de Noorderkade met de stadswaag en stadskraan.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/71CD4684E8C157A385F4E837A513E5D7",
    "additionalInfo": "Met behulp van de stadskraan konden zware goederen, zoals wijntonnen, in en uit schepen geladen worden. Het water is van oudsher een belangrijke transportroute in Utrecht."
  },
  {
    "id": "page8",
    "catalogNumber": "135008",
    "title": "Noorderkade en Koninklijke Fabriek",
    "description": "Gezicht op de Noorderkade te Utrecht, de Koninklijke Fabriek van Landbouwkundige Werktuigen, bierbrouwerij De Krans en het Paardenveld met de molen De Rijn en Zon.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/6FC84D5C50C55AD8A179D722039F3C82",
    "additionalImages": [
      {
        "url": "/images/page8-5.png",
        "description": "Gezicht op de stoombierbrouwerij De Krans (Nieuwekade 30) te Utrecht. Vanaf de middeleeuwen werd er in Utrecht volop bier gebrouwen. Tot ver in de 19e eeuw werd hier grachtenwater voor gebruikt. In de twintigste eeuw verloren de Utrechtse brouwerijen de concurrentiestrijd met die uit Amsterdam en verdwenen de brouwerijen in de stad."
      }
    ]
  },
  {
    "id": "page9",
    "catalogNumber": "135009",
    "title": "Paardenveld met molen De Meiboom",
    "description": "Gezicht op het Paardenveld te Utrecht met de molen De Meiboom en rechts een was- en badhuis, de latere Wasch- en Badinrichting van W. de Rijk.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/E36B0BDECC935D8482ACBFD4EFC99BFC",
    "additionalInfo": "Badhuizen werden sinds eind 19e eeuw gebouwd, toen er een grotere aandacht kwam voor hygiëne, gezondheid en levensstijl. De vraag naar hygiënische baden nam toe door industrialisatie en verstedelijking, wat leidde tot de bouw van openbare badhuizen, waar tegen betaling een bad of douche kon worden genomen."
  },
  {
    "id": "page10",
    "catalogNumber": "135010",
    "title": "Catharijnebrug en gasfabriek",
    "description": "Gezicht over de Catharijnebrug te Utrecht op een groot appartementengebouw, het douanekantoortje (de Catharijnebarrière), een herenhuis (later Bierhuis De Hoop) en de gasfabriek van W.H. de Heus op en bij het noordwestelijke bastion van het vroegere kasteel Vredenburg.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/A2001190E8D4503290B58D0E91C3C00B",
    "additionalImages": [
      {
        "url": "/images/page10-2.png",
        "description": "Gezicht op de stadsbuitengracht en de Catharijnebrug te Utrecht, uit het zuidwesten, met op de achtergrond een gebouw waarin meerdere woonhuizen zijn gecombineerd aan de latere Catharijnekade. Omstreeks 1859."
      },
      {
        "url": "/images/page10-3.png",
        "description": "Gezicht op de Stadsbuitengracht en de Catharijnebrug te Utrecht, uit het noordwesten, met links het commiezenhuisje, daarachter de schoorsteen van de gasfabriek van W.H. de Heus op het Vredenburg en in het midden een herenhuis (later bierhuis De Hoop). Omstreeks 1859."
      },
      {
        "url": "/images/page10-4.png",
        "description": "Gezicht op de gasfabriek van W.H. de Heus op het Vredenburg te Utrecht, met daarbij de 'Nieuwejaars Heil- en Zegenwensch' van de gaslantaarnopstekers bij de aanvang van het jaar 1857."
      }
    ]
  },
  {
    "id": "page11",
    "catalogNumber": "135011",
    "title": "Koperpletterij W.H. de Heus",
    "description": "Gezicht op de koperpletterij van W.H. de Heus met het zuidwestelijke bastion van het vroegere kasteel Vredenburg en rechts de Rijnkade te Utrecht.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/63F776776A4F5571B7F9BA921BA82C53",
    "additionalImages": [
      {
        "url": "/images/page11-1.png",
        "description": "Plattegrond van het gebouwencomplex van de koperpletterij en gasfabriek van W.H. de Heus, gelegen tussen de Stadsbuitengracht en het Vredenburg te Utrecht; met vermelding van de bestemming van de gebouwen. Met legenda en een aantal doorhalingen en notities."
      }
    ]
  },
  {
    "id": "page12",
    "catalogNumber": "135012",
    "title": "Willemsbrug en Rijnkade",
    "description": "Gezicht over de Willemsbrug op de Rijnkade te Utrecht, het hek met de douanekantoortjes aan weerszijden van de brug (de Willemsbarrière) en rechts van de brug het begin van het in Engelse landschapsstijl aangelegde singelplantsoen.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/258DF9FF4E905A80ACE2E300C1D7C5B0",
    "additionalImages": [
      {
        "url": "/images/page12-1.jpg",
        "description": "Gezicht vanaf de Catharijnesingel over de stadsbuitengracht te Utrecht met de Willemsbrug en enkele herenhuizen aan de Rijnkade en het Willemsplantsoen, uit het zuiden. Omstreeks 1850."
      },
      {
        "url": "/images/page12-2.jpg",
        "description": "Gezicht vanaf de Catharijnesingel te Utrecht over de Willemsbrug met de beide commiezenhuisjes uit het zuidwesten, met links het hoekhuis aan de Rijnkade, rechts een herenhuis in het Willemsplantsoen en op de achtergrond de Mariaplaats en de Buur- en Domtoren. Omstreeks 1850."
      }
    ]
  },
  {
    "id": "page13",
    "catalogNumber": "135013",
    "title": "Singelplantsoen met theehuis",
    "description": "Gezicht op het in Engelse landschapsstijl aangelegde singelplantsoen te Utrecht met het theehuis van de oud-rooms-katholieke aartsbisschop en rechts het hospitaal van het Duitse Huis. Het kruis boven het langgerekte rode dak is van de Dominicuskerk op de Mariaplaats.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/4A4C50C570245E8588497B3C7A450AF2",
    "additionalImages": [
      {
        "url": "/images/page13-1.png",
        "description": "Gezicht op de Mariaplaats te Utrecht uit het westen, met in het midden op de achtergrond de Zadelstraat en de Domtoren. Op de foto zie je ook een waterpomp. De pomp werd in 1844 op de Mariaplaats geplaatst en leverde schoon water, zelfs tijdens de cholera-uitbraken in de jaren 1870."
      }
    ]
  },
  {
    "id": "page14",
    "catalogNumber": "135014",
    "title": "Singelplantsoen bij Zeven Steegjes",
    "description": "Gezicht op het in Engelse landschapsstijl aangelegde singelplantsoen te Utrecht ter hoogte van de Zeven Steegjes. De opzet van het plan Zocher was om de minder aantrekkelijke delen van de stad te camoufleren. Dat doet hij hier door middel van een plantsoen.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/6759D656B0C95F08925ADB45D52FC5EF",
    "additionalImages": [
      {
        "url": "/images/page14-1.png",
        "description": "Plattegrond van de stad Utrecht met directe omgeving; met weergave van het stratenplan (deels met straatnamen), wegen en watergangen en aanduiding van de belangrijke gebouwen. Met weergave van alle groenvoorzieningen, waaronder de plantsoenen, door Zocher aangelegd op de geslechte wallen en bolwerken, aangeduid als 'Nieuwe wandeling'. Met lijst van belangrijke gebouwen en overige objecten. Datering rond 1858."
      }
    ]
  },
  {
    "id": "page15",
    "catalogNumber": "135015",
    "title": "Bartholomeusgasthuis",
    "description": "Gezicht op het singelplantsoen te Utrecht met het Bartholomeusgasthuis.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/CA88E4BBEF625553BA328781A0EAE594"
  },
  {
    "id": "page16",
    "catalogNumber": "135016",
    "title": "Geertekerk en houtvlot",
    "description": "Gezicht op het singelplantsoen te Utrecht met links de Geertekerk en in de stadsbuitengracht een houtvlot.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/88A6A522198C5D69B1E2A459A076036C",
    "additionalInfo": "De stadsbuitengracht (Singel) had de taak als doorgaande scheepsroute overgenomen van de Oudegracht. Dit houtvlot bestaat uit aan elkaar gebonden rijen boomstammen. Zo'n transport was vaak dagenlang onderweg naar zijn eindbestemming, dikwijls Amsterdam."
  },
  {
    "id": "page17",
    "catalogNumber": "135017",
    "title": "Diakonessenhuis en bastion Sterrenburg",
    "description": "Gezicht op het singelplantsoen te Utrecht met half achter de bomen het Diakonessenhuis aan de Springweg en rechts een gedeelte van het vroegere bastion Sterrenburg met daarachter de molen op de Bijlhouwerstoren en in de stadsbuitengracht een houtvlot.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/28CC42C93E3E52ECBC63C4496D95DD45"
  },
  {
    "id": "page18",
    "catalogNumber": "135018",
    "title": "Bastion Sterrenburg en Bijlhouwerstoren",
    "description": "Gezicht op het singelplantsoen te Utrecht met het dubbele woonhuis boven de kazematten van het vroegere bastion Sterrenburg en de molen op de Bijlhouwerstoren.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/EAB9EA9ABD12590990685BA19BB84658"
  },
  {
    "id": "page19",
    "catalogNumber": "135019",
    "title": "Tolsteegbrug en bastion Manenburg",
    "description": "Gezicht over de Tolsteegbrug te Utrecht op de hekpalen van de Tolsteegbarrière bij het Ledig Erf met daaronder de uitmonding van de Oudegracht in de stadsbuitengracht en rechts het in het singelplantsoen opgenomen vroegere bastion Manenburg.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/73228A5574FB54CBB908821C0782B896"
  },
  {
    "id": "page20",
    "catalogNumber": "135020",
    "title": "Nicolaikerk en cavaleriestallen",
    "description": "Gezicht op het singelplantsoen te Utrecht met de zuidwestelijke toren van de Nicolaikerk en de cavaleriestallen met daarachter een gebouw van het voormalige St.-Agnietenklooster. Tegenwoordig ziet hier het Centraal Museum.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/EDC28E77EE0A537C9101A3F79BE38CE6"
  },
  {
    "id": "page21",
    "catalogNumber": "135021",
    "title": "Fundatie van Renswoude",
    "description": "Gezicht op het singelplantsoen te Utrecht met het gebouw van de Fundatie van de Vrijvrouwe van Renswoude en rechts de kameren van Maria van Pallaes aan de Agnietenstraat.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/F0DFA55F8AC0533F908948D3B2513F86"
  },
  {
    "id": "page22",
    "catalogNumber": "135022",
    "title": "Nieuwegracht Onder de Linden",
    "description": "Gezicht op het singelplantsoen te Utrecht met geheel links de regentenkamer van de kameren van Maria van Pallaes en daarnaast de Nieuwegracht 'Onder de Linden' en de uitmonding van de Nieuwegracht in de stadsbuitengracht en rechts de rode daken van gebouwen van de voormalige St.-Servaasabdij.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/3D37B999C1995D7F8945C563E1F00E97"
  },
  {
    "id": "page23",
    "catalogNumber": "135023",
    "title": "Bastion Zonnenburg met Sterrenwacht",
    "description": "Gezicht op het singelplantsoen rond het voormalige bastion Zonnenburg te Utrecht met links op de achtergrond een van de gebouwen van de voormalige St.-Servaasabdij, in het midden het Meteorologisch Instituut en rechts de Sterrenwacht.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/FE85A26FBA285835A01DD51A26B62E42",
    "additionalImages": [
      {
        "url": "/images/page23-1.png",
        "description": "Gezicht over de stadsbuitengracht te Utrecht op het Meteorologisch Instituut op het voormalige bastion Zonnenburg. Foto omstreeks 1859."
      },
      {
        "url": "/images/page23-2.jpg",
        "description": "Gezicht over de stadsbuitengracht te Utrecht op de Sterrenwacht (Astronomisch Observatorium) op het voormalige bastion Zonnenburg. Foto omstreeks 1859."
      }
    ]
  },
  {
    "id": "page24",
    "catalogNumber": "135024",
    "title": "Servaasbolwerk",
    "description": "Gezicht op het singelplantsoen bij het Servaasbolwerk te Utrecht met rechts op de achtergrond een gedeelte van het St.-Magdalenaklooster.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/CD56E44A31FF505B994E7E4D033EDB6C",
    "additionalImages": [
      {
        "url": "/images/page24-1.png",
        "description": "Plattegrond van een niet gevoerd ontwerp van Zocher voor een plantsoen op het bastion Lepelenburg te Utrecht."
      }
    ]
  },
  {
    "id": "page25",
    "catalogNumber": "135025",
    "title": "Leeuwenberchgasthuis",
    "description": "Gezicht op het singelplantsoen bij het Servaasbolwerk te Utrecht met het gebouw van het voormalige Leeuwenberchgasthuis, destijds in gebruik als chemisch laboratorium, en op de achtergrond de daken van de bisschoppelijke stallen op het Servaasbolwerk.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/5D7B85DA087B59CE94AE432CFBBCF908"
  },
  {
    "id": "page26",
    "catalogNumber": "135026",
    "title": "Maliebrug en Lepelenburg",
    "description": "Gezicht over de Maliebrug met het dubbele hek en het douanekantoortje (de Maliebarrière) te Utrecht op het singelplantsoen met geheel links een gedeelte van de Bruntenhof en rechts een gedeelte van het bolwerk Lepelenburg.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/5890DC9B634A51B8A6A720B98851D290",
    "additionalImages": [
      {
        "url": "/images/page26-1.jpg",
        "description": "Gezicht op de Maliebrug over de Stadsbuitengracht te Utrecht, uit het noordoosten."
      }
    ]
  },
  {
    "id": "page27",
    "catalogNumber": "135027",
    "title": "Bolwerk Lepelenburg met Lievendaal",
    "description": "Gezicht op het voormalige bolwerk Lepelenburg te Utrecht met links het huis Lievendaal en rechts enkele particuliere tuinhuizen.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/A9A6F5A2D16A5F4F8F803D074786B13B"
  },
  {
    "id": "page28",
    "catalogNumber": "135028",
    "title": "Particuliere tuinen Lepelenburg",
    "description": "Gezicht op het voormalige bolwerk Lepelenburg te Utrecht met een aantal particuliere tuinen en tuinhuizen.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/CA0B6316D7905D4C8589457F8C9001AA"
  },
  {
    "id": "page29",
    "catalogNumber": "135029",
    "title": "Herenstraat en Hieronymusplantsoen",
    "description": "Gezicht op het singelplantsoen te Utrecht ten noorden van het voormalige bolwerk Lepelenburg, waarop het witte huis links staat, met in het midden de huizen aan het begin van de Herenstraat en rechtsachter enkele van de kameren van Jan van der Meer aan het Hieronymusplantsoen.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/613B43B28E9D5000B05A6CAE90B08305"
  },
  {
    "id": "page30",
    "catalogNumber": "135030",
    "title": "Kromme Nieuwegracht en stadsmuur",
    "description": "Gezicht op het singelplantsoen te Utrecht ter hoogte van de bocht van de Kromme Nieuwegracht (links op de achtergrond) met de huizen aan het Hieronymusplantsoen en daarachter de voormalige St.-Hieronymuskapel en rechts twee boogjes, de restanten van de oude stadsmuur.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/E4C30A03277455A08CF407FC60681B72"
  },
  {
    "id": "page31",
    "catalogNumber": "135031",
    "title": "Lucasbrug en Suikerhuis",
    "description": "Gezicht op het singelplantsoen te Utrecht met links de Zonstraat (later gewijzigd in Nobelstraat) die aansluit op de Lucasbrug, op de voorgrond, met rechts daarvan het Lucasbolwerk met het Suikerhuis.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/33334F8B578654D185D79BC427669DFB",
    "additionalImages": [
      {
        "url": "/images/page31-1.png",
        "description": "De Lucasbrug werd ook wel 'knuppelbrug' genoemd. De brug is opgebouwd uit schijnbaar willekeurig geplaatste ruwe boomstammetjes."
      }
    ]
  },
  {
    "id": "page32",
    "catalogNumber": "135032",
    "title": "Suikerhuis directeurswoning",
    "description": "Gezicht op het singelplantsoen te Utrecht met links de noordelijke punt van het Lucasbolwerk met de directeurswoning van het Suikerhuis. Het Suikerhuis was een suikerraffinaderij die in 1721 werd begonnen. In 1860 werd deze afgebroken.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/AA7F2C16737A51AEB41E75F892B46704",
    "additionalImages": [
      {
        "url": "/images/page32-1.jpg",
        "description": "Gezicht op het Lucasbolwerk met het Suikerhuis te Utrecht, vóór de afbraak, uit het noorden."
      }
    ]
  },
  {
    "id": "page33",
    "catalogNumber": "135033",
    "title": "Einde panorama",
    "description": "Gezicht op het singelplantsoen te Utrecht ten noorden van het Lucasbolwerk. Uiterst rechts sluit het plantsoen aan bij de Wittevrouwenbrug waarmee het panorama begint. Hier eindigt de tekenaar zijn rondje langs de singel.",
    "imageUrl": "https://hetutrechtsarchief.nl/beeld/33124A9788485D87ABA2B6030C6BD73B"
  }
];

export const panoramaInfo = {
  title: "Panorama van Utrecht 1859",
  description: "Een 5,82 meter lange leporello die een rondwandeling om het centrum van Utrecht toont, met wisselend uitzicht vanaf de singels.",
  totalLength: "5.82 meter",
  year: "1859",
  technique: "Leporello (harmonicaboek)",
  sheets: 4,
  pages: 33,
  artist: "J. Bos",
  printer: "P.W. van de Weijer",
  publisher: "Wed. Herfkens en zoon",
  collection: "Het Utrechts Archief"
};
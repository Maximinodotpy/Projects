interface Person {
    first_name: string;
    last_name: string;
    birth_date: string;
    death_date: string;

    // Optional properties
    real_pictures?: { url: string, alt: string }[];
    actor_pictures?: string[];

    roles?: string[];
}

const R_AFFAIRS = "affairs";
const R_SCIENTIST = "scientist";
const R_LEADER = "leader";

export const people: Person[] = [
    // J. Robert Oppenheimer
    {
        first_name: "J. Robert",
        last_name: "Oppenheimer",
        birth_date: "1904-04-22",
        death_date: "1967-02-18",
        roles: [R_SCIENTIST, R_LEADER],
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/0/03/JROppenheimer-LosAlamos.jpg", alt: "J. Robert Oppenheimer at Los Alamos" },
            { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/HD.3C.022_%2810579507263%29.jpg/1280px-HD.3C.022_%2810579507263%29.jpg', alt: 'Katherine Oppenheimer (6. von links) 1963 bei der Verleihung des Fermi-Preises an ihren Mann' }
        ],
        actor_pictures: [
            
        ]
    },
    // Lewis Strauss
    {
        first_name: "Lewis",
        last_name: "Strauss",
        birth_date: "1896-01-31",
        death_date: "1974-01-21",
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Lewis_Lichtenstein_Strauss_pers0164.jpg/800px-Lewis_Lichtenstein_Strauss_pers0164.jpg", alt: "Lewis Strauss" },
            { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Eisenhower_and_Strauss.jpg/1280px-Eisenhower_and_Strauss.jpg", alt: "Präsident Eisenhower (left) and Lewis Strauss (March 1954)" }
        ],
        actor_pictures: []
    },
    // Katherine "Kitty" Oppenheimer
    {
        first_name: "Katherine",
        last_name: "Oppenheimer",
        birth_date: "1910-11-22",
        death_date: "1972-07-02",
        roles: [],
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Katherine_%28Kitty%29_Oppenheimer_ID_badge_photo.jpg/330px-Katherine_%28Kitty%29_Oppenheimer_ID_badge_photo.jpg", alt: "Foto für Katherine Oppenheimers Mitarbeiterausweis im Los-Alamos-Labor, ca. 1944" }
        ],
        actor_pictures: []
    },
    // Albert Einstein
    {
        first_name: "Albert",
        last_name: "Einstein",
        birth_date: "1879-03-14",
        death_date: "1955-04-18",
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg", alt: "" },
            { url: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg", alt: "" }
        ],
        actor_pictures: []
    },
    // Niels Bohr
    {
        first_name: "Niels",
        last_name: "Bohr",
        birth_date: "1885-10-07",
        death_date: "1962-11-18",
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Niels_Bohr.jpg/800px-Niels_Bohr.jpg", alt: "Niels Bohr (1922)" },
            { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Niels_Bohr_Albert_Einstein4_by_Ehrenfest_cr.jpg/220px-Niels_Bohr_Albert_Einstein4_by_Ehrenfest_cr.jpg", alt: "Niels Bohr 1925 with Albert Einstein" },
        ],
        actor_pictures: []
    },
    // Enrico Fermi
    {
        first_name: "Enrico",
        last_name: "Fermi",
        birth_date: "1901-09-29",
        death_date: "1954-11-28",
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Enrico_Fermi_1943-49.jpg", alt: "Enrico Fermi" },
            { url: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Enrico_Fermi_ID_badge.png', alt: "Enrico Fermi - Foto seines Los-Alamos-Dienstausweises (Zweiter Weltkrieg)" }
        ],
        actor_pictures: []
    },

    // Richard Feynman
    {
        first_name: "Richard",
        last_name: "Feynman",
        birth_date: "1918-05-11",
        death_date: "1988-02-15",
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/RichardFeynman-PaineMansionWoods1984_copyrightTamikoThiel_bw.jpg/330px-RichardFeynman-PaineMansionWoods1984_copyrightTamikoThiel_bw.jpg",
                alt: "Richard Feynman, 1984" },
            { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Feynman-richard_p.jpg/330px-Feynman-richard_p.jpg",
                alt: "Richard Feynman (Los-Alamos-Dienstausweis während des Zweiten Weltkriegs)" }
        ],
        actor_pictures: []
    },
    // Hans Bethe
    {
        first_name: "Hans",
        last_name: "Bethe",
        birth_date: "1906-07-02",
        death_date: "2005-03-06",
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Hans_Bethe.jpg/330px-Hans_Bethe.jpg", alt: "Hans Bethe" },
            { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Hans_Bethe_ID_badge.png/330px-Hans_Bethe_ID_badge.png', alt: 'Hans Bethe Foto des Los-Alamos-Dienstausweises während des Zweiten Weltkriegs' }
        ],
        actor_pictures: []
    },
    // Edward Teller
    {
        first_name: "Edward",
        last_name: "Teller",
        birth_date: "1908-01-15",
        death_date: "2003-09-09",
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/EdwardTeller1958.jpg/800px-EdwardTeller1958.jpg", alt: "Edward Teller (1958)" }
        ],
        actor_pictures: []
    },
    // Leo Szilard
    {
        first_name: "Leo",
        last_name: "Szilard",
        birth_date: "1898-02-11",
        death_date: "1964-05-30",
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Leo_Szilard.jpg/800px-Leo_Szilard.jpg", alt: "Leó Szilárd (1960) Unterschrift von Leo Szilard, unter der Szilard Petition 1945" }
        ],
        actor_pictures: []
    },
    // John von Neumann
    {
        first_name: "John",
        last_name: "von Neumann",
        birth_date: "1903-12-28",
        death_date: "1957-02-08",
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/JohnvonNeumann-LosAlamos.gif/330px-JohnvonNeumann-LosAlamos.gif", alt: "John von Neumann (um 1940)" }
        ],
        actor_pictures: []
    },
    // Stanislaw Ulam
    {
        first_name: "Stanislaw",
        last_name: "Ulam",
        birth_date: "1909-04-13",
        death_date: "1984-05-13",
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/b/be/Stanislaw_Ulam_ID_badge.png", alt: "Stanisław Ulam (Foto auf seinem Los-Alamos-Dienstausweis während des Zweiten Weltkriegs)" }
        ],
        actor_pictures: []
    },
    // Klaus Fuchs
    {
        first_name: "Klaus",
        last_name: "Fuchs",
        birth_date: "1911-12-29",
        death_date: "1988-01-28",
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/U.S._vs._Julius_%26_Ethel_Rosenberg_and_Martin_Sobell%2C_Government_Exhibit_12%2C_Photograph_of_Klaus_Fuchs_-_NARA_-_278757.jpg/800px-U.S._vs._Julius_%26_Ethel_Rosenberg_and_Martin_Sobell%2C_Government_Exhibit_12%2C_Photograph_of_Klaus_Fuchs_-_NARA_-_278757.jpg", alt: "Klaus Fuchs, 1951" }
        ],
        actor_pictures: []
    },
    // Ruth Tolman
    {
        first_name: "Ruth",
        last_name: "Tolman",
        birth_date: "1896-12-03",
        death_date: "1969-12-29",
        real_pictures: [
            /* { url: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Ruth_Tolman.jpg", alt: "Ruth Tolman" } */
        ],
        actor_pictures: []
    },
    // Leslie Groves
    {
        first_name: "Leslie",
        last_name: "Groves",
        birth_date: "1896-08-17",
        death_date: "1970-07-13",
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/LTG_Leslie_R._Groves_%28cropped%29.jpg/330px-LTG_Leslie_R._Groves_%28cropped%29.jpg", alt: "Groves in 1948" }
        ],
        actor_pictures: []
    },
    // Harry S. Truman
    {
        first_name: "Harry S.",
        last_name: "Truman",
        birth_date: "1884-05-08",
        death_date: "1972-12-26",
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/TRUMAN_58-766-06_%28cropped%29.jpg/330px-TRUMAN_58-766-06_%28cropped%29.jpg", alt: "Harry S. Truman (circa 1947)" },
            { url: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Roosevelt_Truman_Wallace.jpg', alt: 'Im November 1944 nach der gewonnenen Präsidentschaftswahl: Präsident Franklin D. Roosevelt (links hinten), Harry S. Truman als gewählter Vizepräsident (mittig) und der scheidende Vizepräsident Henry A. Wallace (rechts)' }
        ],
        actor_pictures: []
    },
    // Franklin D. Roosevelt
    {
        first_name: "Franklin D.",
        last_name: "Roosevelt",
        birth_date: "1882-01-30",
        death_date: "1945-04-12",
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/FDR_1944_Color_Portrait.jpg/220px-FDR_1944_Color_Portrait.jpg", alt: "Franklin D. Roosevelt (1944)" },
            { url: "https://upload.wikimedia.org/wikipedia/commons/b/be/Roosevelt_in_a_wheelchair.jpg", alt: "Franklin D. Roosevelt in a wheelchair (1941)" }
        ],
        actor_pictures: []
    },
    // Henry L. Stimson
    {
        first_name: "Henry L.",
        last_name: "Stimson",
        birth_date: "1867-09-21",
        death_date: "1950-10-20",
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Henry_Stimson%2C_Harris_%26_Ewing_bw_photo_portrait%2C_1929.jpg/330px-Henry_Stimson%2C_Harris_%26_Ewing_bw_photo_portrait%2C_1929.jpg", alt: "Henry L. Stimson als Außenminister (1929)" }
        ],
        actor_pictures: []
    },
    // Boris Pash
    {
        first_name: "Boris",
        last_name: "Pash",
        birth_date: "1900-06-20",
        death_date: "1995-05-11",
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/0/04/Boris_Pash.jpg", alt: "Boris Pash (1945)" }
        ],
        actor_pictures: []
    },
    // Kenneth Nichols
    {
        first_name: "Kenneth",
        last_name: "Nichols",
        birth_date: "1907-11-13",
        death_date: "2000-02-21",
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/6/69/Kenneth_D._Nichols.jpeg", alt: "Major General Kenneth D. Nichols" }
        ],
        actor_pictures: []
    },
    // William Borden
    {
        first_name: "William",
        last_name: "Borden",
        birth_date: "1910-02-25",
        death_date: "1971-07-11",
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/en/6/68/William_L_Borden_c_1954.png", alt: "William Borden" }
        ],
        actor_pictures: []
    },
    // Frank Oppenheimer
    {
        first_name: "Frank",
        last_name: "Oppenheimer",
        birth_date: "1912-08-14",
        death_date: "1985-02-03",
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Frank_Oppenheimer.jpg", alt: "Frank Oppenheimer, founding director of the Exploratorium" }
        ],
        actor_pictures: []
    },
    // Robert Serber
    {
        first_name: "Robert",
        last_name: "Serber",
        birth_date: "1909-03-14",
        death_date: "1997-06-01",
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/3/34/Robert_Serber_ID_badge.png", alt: "Robert Serber, on a Los Alamos wartime badge photo" }
        ],
        actor_pictures: []
    },
    // Richard Tolman
    {
        first_name: "Richard",
        last_name: "Tolman",
        birth_date: "1881-03-04",
        death_date: "1948-09-05",
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/1/19/Richard_C._Tolman.jpg", alt: "Richard C. Tolman in 1945." }
        ],
        actor_pictures: []
    },
    // Jean Tatlock
    {
        first_name: "Jean",
        last_name: "Tatlock",
        birth_date: "1911-12-12",
        death_date: "1944-02-14",
        roles: [R_AFFAIRS],
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Portrait_of_Jean_Tatlock_in_her_20s.jpg/220px-Portrait_of_Jean_Tatlock_in_her_20s.jpg", alt: "Jean Tatlock" }
        ],
        actor_pictures: []
    },
    // Vannevar Bush
    {
        first_name: "Vannevar",
        last_name: "Bush",
        birth_date: "1890-03-11",
        death_date: "1974-06-28",
        roles: [R_SCIENTIST],
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Vannevar_Bush_portrait.jpg/330px-Vannevar_Bush_portrait.jpg", alt: "Vannevar Bush" }
        ],
        actor_pictures: []
    },
    // Ernest Lawrence
    {
        first_name: "Ernest",
        last_name: "Lawrence",
        birth_date: "1901-08-08",
        death_date: "1958-08-27",
        real_pictures: [
            { url: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Ernest_Lawrence.jpg", alt: "Ernest Lawrence (1939)" },
            { url: "https://upload.wikimedia.org/wikipedia/commons/d/de/Oppenheimer_Fermi_Lawrence.jpeg", alt: "Oppenheimer, Fermi und Lawrence (from left)" }
        ],
        actor_pictures: []
    },
]
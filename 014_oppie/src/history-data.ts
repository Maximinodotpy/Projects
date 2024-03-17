import { DataSet } from "vis-data/peer";

export const groups = new DataSet([
    { id: 1, content: "Teacher" },
    { id: 2, content: "Politician" },
    { id: 3, content: "History" },
]);

const TEACHER_ID = 1;
const POLITICIAN_ID = 2;
const HISTORY_ID = 3;

// A lot of Data About the life of J. Robert Oppenheimer
export const data = new DataSet([
    { id: 1, selectable: true, content: "Oppenheimer is born", start: "1904-04-22", className: 'oppenheimer'},
    { id: 2, selectable: true, content: "Oppenheimer marries", start: "1940-11-01", className: 'oppenheimer'},
    { id: 3, selectable: true, content: "Oppenheimer becomes director of Los Alamos Laboratory", start: "1943-09-01", className: 'oppenheimer'},
    { id: 4, selectable: true, content: "Oppenheimer becomes chairman of the General Advisory Committee of the Atomic Energy Commission", start: "1947-06-01", className: 'oppenheimer'},
    { id: 5, selectable: true, content: "Oppenheimer is stripped of his security clearance", start: "1954-12-01", className: 'oppenheimer'},
    { id: 6, selectable: true, content: "Oppenheimer dies", start: "1967-02-18", className: 'oppenheimer'},

    // Historic Epochs like the "Cold War" and "World War II"  as background areas
    { id: 8, selectable: true, content: "WW2", start: "1939-09-01", end: "1945-09-02", type: "background" }, 
    { id: 9, selectable: true, content: "Cold War", start: "1947-09-02", end: "1991-12-26", type: "background" },

    // WW1
    { id: 10, selectable: true, content: "WW1", start: "1914-07-28", end: "1918-11-11", type: "background" },

    // Oppenheimer publishes paper on Black holes
    { id: 11, selectable: true, content: "Oppenheimer publishes paper on Black holes", start: "1939-09-01", className: 'oppenheimer'},

    // Trinity Test (Exact time)
    { id: 12, selectable: true, content: "Trinity Test", start: "1945-07-16T05:29:45", className: 'history'},

    // Hirosima and Nagasaki (Exact time)
    { id: 13, selectable: true, content: "Hirosima", start: "1945-08-06T08:15:00", className: 'history' },
    { id: 14, selectable: true, content: "Nagasaki", start: "1945-08-09T11:02:00", className: 'history' },

    // Oppenheimer becomes a teacher at the University of California, Berkeley
    { id: 16, selectable: true, content: "Oppenheimer becomes a teacher at the University of California, Berkeley", start: "1929-09-01", className: 'oppenheimer'},

    // The Soviet Union tests its first atomic bomb
    { id: 17, selectable: true, content: "The Soviet Union tests its first atomic bomb", start: "1949-08-29", className: 'history' },

    // The United States tests its first hydrogen bomb
    { id: 18, selectable: true, content: "The United States tests its first hydrogen bomb", start: "1952-11-01", className: 'history' },

    // Oppenheimer the movie is released
    { id: 19, selectable: true, content: "Oppenheimer the movie is released", start: "2023-07-21"},

    // Oppenheimer studies in Göttingen (Time Range)
    { id: 20, selectable: true, content: "Oppenheimer studies in Göttingen", start: "1927-09-01", end: "1929-09-01", className: 'oppenheimer'},

    // Oppenheimer studies in Cambridge (Time Range)
    { id: 21, selectable: true, content: "Oppenheimer studies in Cambridge", start: "1925-09-01", end: "1927-09-01", className: 'oppenheimer'},

    // Oppenheimer studies in Harvard (Time Range)
    { id: 22, selectable: true, content: "Oppenheimer studies in Harvard", start: "1922-09-01", end: "1925-09-01", className: 'oppenheimer'},

    // Oppenheimer studies in Ethical Culture School (Time Range)
    { id: 23, selectable: true, content: "Oppenheimer studies in Ethical Culture School", start: "1911-09-01", end: "1922-09-01", className: 'oppenheimer'},

    // Oppenheimer first goes to New Mexico
    { id: 24, selectable: true, content: "Oppenheimer first goes to New Mexico", start: "1922-09-01", className: 'oppenheimer' },

    // Einstein publishes his theory of general relativity
    { id: 26, selectable: true, content: "Einstein publishes his theory of general relativity", start: "1915-11-25", className: 'history'},

    // Einstein publishes his theory of special relativity
    { id: 27, selectable: true, content: "Einstein publishes his theory of special relativity", start: "1905-06-30", className: 'history'},

    // Japan surrenders
    { id: 28, selectable: true, content: "Japan surrenders", start: "1945-09-02", className: 'history' },

    // Germany surrenders
    { id: 29, selectable: true, content: "Germany surrenders", start: "1945-05-08", className: 'history' },

    // Chernobyl disaster
    { id: 30, selectable: true, content: "Chernobyl disaster", start: "1986-04-26", className: "consequences"},

    // Fukushima disaster
    { id: 31, selectable: true, content: "Fukushima disaster", start: "2011-03-11", className: "consequences"},

    // Three Mile Island accident
    { id: 32, selectable: true, content: "Three Mile Island accident", start: "1979-03-28", className: "consequences"},
    /* { id: 32, selectable: true, content: createDetailsHTML('flaksjd', 'fasdfa'), start: "1979-03-28", className: "consequences" }, */
]);

function createDetailsHTML(title: string, content: string) {
    return /* html */`
    <details>
        <summary>${title}</summary>
        <p>${content}</p>
    </details>
    `
}
/// <reference types="svelte" />
/// <reference types="vite/client" />

// A location object showing a line's stop at the requested station
declare class Location {
    id: string;
    type: "station" | "poi" | "address" | "refine";
    name: string;
    score: number | null;
    coordinate: Coordinates;
    distance: number | null;
}

// The type of the given coordinate
declare class Coordinates {
    type: "WGS84";
    x: number;
    y: number;
}

// A connection represents a possible journey between two locations
declare class Connection {
    from: Checkpoint;
    to: Checkpoint;
    duration: string;
    service: Service | null;
    products: string[];
    capacity1st: number;
    capacity2nd: number;
    sections: Section[];
}

// A checkpoint represents an arrival or a departure point of a connection
declare class Checkpoint {
    station: Location;
    arrival: string | null;
    arrivalTimestamp: number | null;
    departure: string | null;
    departureTimestamp: number | null;
    platform: string;
    prognosis: Prognosis;
}

// A prognosis contains "realtime" information on the status of a connection checkpoint
declare class Prognosis {
    platform: string | null;
    arrival: string | null;
    departure: string | null;
    capacity1st: number;
    capacity2nd: number;
}

// A connection consists of one or multiple sections
declare class Section {
    journey: Journey | null;
    walk: Walk | null;
    departure: Checkpoint;
    arrival: Checkpoint;
}

// The actual transportation of a section, e.g. a bus or a train between two stations
declare class Journey {
    name: string;
    category: string;
    categoryCode: number;
    number: string;
    operator: string | null;
    to: string;
    passList: Checkpoint[];
    capacity1st: number;
    capacity2nd: number;
}

// Information about walking distance, if available
declare class Walk {
    duration: number;
}

// Operation information for a connection
declare class Service {
    regular: string;
    irregular: string | null;
}

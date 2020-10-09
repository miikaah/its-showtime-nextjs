export type ShowtimeEvent = {
    id: string;
    name?: string;
    startDate: Date;
    endDate: Date;
};

export type Action = {
    type: "showtime/add_event" | "showtime/remove_event" | "showtime/update_event";
    event: ShowtimeEvent;
};

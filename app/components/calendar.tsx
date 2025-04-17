// Define interfaces for the Google Calendar API response
interface GCalEvent {
  kind: string;
  id: string;
  summary?: string;
  description?: string;
  start?: {
    dateTime?: string;
    timeZone?: string;
    date?: string;
  };
  end?: {
    dateTime?: string;
    date?: string;
  };
}

interface GCalAPIResponse {
  kind: string;
  etag: string;
  items: GCalEvent[];
}

export default async function Calendar() {
  // Read from environment variables
  const calendarId = process.env.CALENDAR_ID;
  const apiKey = process.env.CALENDAR_API_KEY;

  if (!calendarId || !apiKey) {
    return (
      <main>
        <h1>Google Calendar Events</h1>
        <p>
          Missing <code>NEXT_PUBLIC_CALENDAR_ID</code> or{" "}
          <code>NEXT_PUBLIC_API_KEY</code> environment variables.
        </p>
      </main>
    );
  }

  // Calculate timeMin for "today at midnight"
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const timeMin = now.toISOString();

  // Construct the API endpoint
  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${timeMin}&singleEvents=true&orderBy=startTime`;

    // Fetch data on the server
  let events: GCalEvent[] = [];

  try {
    const res = await fetch(url, {
      // For example, skip caching and always fetch fresh data:
      cache: "no-store",
      // Or revalidate after some seconds (Incremental Static Regeneration):
      // next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch Google Calendar events (${res.status})`);
    }

    const data = (await res.json()) as GCalAPIResponse;
    events = data.items || [];
  } catch (error) {
    console.error("Error fetching Google Calendar events:", error);
  }

 // Helper to format events:
  // - If dateTime is present, show full date/time
  // - If date is present (all-day event), show just the date
  const formatDate = (event : GCalEvent) => {
    if (event.start?.dateTime) {
      const dt = new Date(event.start.dateTime);
    // If the API didn’t give you a timeZone, fall back to your calendar default:
    const tz = event.start.timeZone ?? "America/New_York";

    const formatted = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      year:   "numeric",
      month:  "numeric",
      day:    "numeric",
      hour:   "numeric",
      minute: "2-digit",
    }).format(dt);

    return formatted; 
    } else if (event.start?.date) {
      // All-day events only have `date`
      return new Date(event.start?.date).toLocaleDateString();
    } else {
      return "N/A";
    }
  };
  
  return (
    <div>
      <h3 className="text-2xl my-4 md:mx-4 text-center">Upcoming Events</h3>
      {events.length === 0 ? (
        <p>No events found or unable to fetch events.</p>
      ) : (
        <div className="w-full">
        <div className="flex justify-center items-center">
          <ul className="w-full max-w-md px-4">
          {events.map((event) => (
            <li key={event.id} className="my-4 md:mx-4">
              <h4>
                <span className="font-bold">{event.summary}
                  </span> - <span>
                  {formatDate(event)}</span>
                  {event.description && <p className="my-2">{event.description}</p>}
              </h4>
            </li>
          ))}
        </ul>
        </div>
        </div>
      )}
    </div>
  );
}
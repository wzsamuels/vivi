

// Define interfaces for the Google Calendar API response
interface GCalEvent {
  kind: string;
  id: string;
  summary?: string;
  description?: string;
  start?: {
    dateTime?: string;
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

  // Construct the API endpoint
  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${timeMin}&singleEvents=true&orderBy=startTime`;

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

    // Fetch data on the server
  let events: GCalEvent[] = [];

  try {
    const res = await fetch(url, {
      // For example, skip caching and always fetch fresh data:
      // cache: "no-store",

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

  // Helper to format either dateTime or date using the same toLocaleString
  const formatDate = (dateTime?: string, date?: string) => {
    if (dateTime) {
      return new Date(dateTime).toLocaleString();
    } else if (date) {
      return new Date(date).toLocaleString();
    } else {
      return "N/A";
    }
  };

  return (
    <div>
      <h3 className="text-2xl my-4 md:mx-4">Upcoming Events</h3>
      {events.length === 0 ? (
        <p>No events found or unable to fetch events.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id} className="my-4 md:mx-4">
              <h4>
                <span className="font-bold">{event.summary}
                  </span> - <span>
                  {formatDate(event.start?.dateTime, event.start?.date)}</span>
              {event.description && <p className="my-2">{event.description}</p>}
              </h4>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
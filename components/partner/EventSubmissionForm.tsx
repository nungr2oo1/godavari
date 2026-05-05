"use client";

import * as React from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/auth-context";
import { useSubmissions } from "@/context/submissions-context";
import type { District, Event } from "@/lib/types";

const DISTRICTS: District[] = [
  "East Godavari",
  "West Godavari",
  "Konaseema",
  "Eluru",
  "Kakinada",
];

function slugify(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function EventSubmissionForm() {
  const { user } = useAuth();
  const { addEvent } = useSubmissions();

  const [title, setTitle] = React.useState("");
  const [date, setDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [district, setDistrict] = React.useState<District | "">("");
  const [location, setLocation] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const [pending, setPending] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const reset = () => {
    setTitle("");
    setDate("");
    setEndDate("");
    setDistrict("");
    setLocation("");
    setTags("");
    setDescription("");
    setImageUrl("");
    setError(null);
    setSubmitted(false);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!district) {
      setError("District is required.");
      return;
    }
    if (description.trim().length < 30) {
      setError("Description should be at least 30 characters.");
      return;
    }
    if (!/^https?:\/\//i.test(imageUrl.trim())) {
      setError("Image URL must start with http(s)://");
      return;
    }

    setError(null);
    setPending(true);

    setTimeout(() => {
      const slug = slugify(title);
      const tagList = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const payload: Event = {
        id: slug || `event-${Date.now()}`,
        slug: slug || `event-${Date.now()}`,
        title: title.trim(),
        date,
        endDate: endDate || undefined,
        location: location.trim(),
        district,
        description: description.trim(),
        image: imageUrl.trim(),
        tags: tagList.length > 0 ? tagList : ["Festival"],
      };

      addEvent({
        partnerId: user.id,
        partnerName: user.name,
        payload,
      });

      setPending(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <Card className="p-6 md:p-8 shadow-soft">
        <div className="text-center py-8 space-y-4">
          <div className="mx-auto h-12 w-12 grid place-items-center rounded-full border border-border bg-background text-foreground">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="font-serif text-2xl font-medium">Submitted for review</h3>
          <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
            Admin will review and approve before the event appears publicly.
          </p>
          <Button variant="outline" onClick={reset} className="mt-2">
            Submit another event
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 md:p-8 shadow-soft">
      <form className="space-y-5" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Label htmlFor="ev-title">Event title</Label>
          <Input
            id="ev-title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Papikondalu Sunset Cruise"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="ev-date">Date</Label>
            <Input
              id="ev-date"
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ev-end">
              End date <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Input
              id="ev-end"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="ev-district">District</Label>
            <Select value={district} onValueChange={(v) => setDistrict(v as District)}>
              <SelectTrigger id="ev-district">
                <SelectValue placeholder="Pick a district" />
              </SelectTrigger>
              <SelectContent>
                {DISTRICTS.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ev-location">Location</Label>
            <Input
              id="ev-location"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Rajamahendravaram launch dock"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ev-tags">Tags</Label>
          <Input
            id="ev-tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="River, Cruise, Sunset"
          />
          <p className="text-xs text-muted-foreground">Comma-separated.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ev-desc">Description</Label>
          <Textarea
            id="ev-desc"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What happens at this event, what travelers can expect."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ev-image">Cover image URL</Label>
          <Input
            id="ev-image"
            required
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://images.unsplash.com/…"
          />
        </div>

        {error && (
          <p className="text-xs text-red-400" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" disabled={pending} className="w-full" size="lg">
          {pending ? (
            "Submitting…"
          ) : (
            <>
              <Send className="h-4 w-4" />
              Submit event for review
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}

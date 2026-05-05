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
import type { District, Place, PlaceType } from "@/lib/types";

const DISTRICTS: District[] = [
  "East Godavari",
  "West Godavari",
  "Konaseema",
  "Eluru",
  "Kakinada",
];
const TYPES: PlaceType[] = ["nature", "temple", "beach", "village", "heritage", "river"];

function slugify(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function PlaceSubmissionForm() {
  const { user } = useAuth();
  const { addPlace } = useSubmissions();

  const [name, setName] = React.useState("");
  const [district, setDistrict] = React.useState<District | "">("");
  const [type, setType] = React.useState<PlaceType | "">("");
  const [shortDescription, setShortDescription] = React.useState("");
  const [overview, setOverview] = React.useState("");
  const [bestTime, setBestTime] = React.useState("");
  const [thingsToDo, setThingsToDo] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const [pending, setPending] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const reset = () => {
    setName("");
    setDistrict("");
    setType("");
    setShortDescription("");
    setOverview("");
    setBestTime("");
    setThingsToDo("");
    setImageUrl("");
    setError(null);
    setSubmitted(false);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!district || !type) {
      setError("District and type are required.");
      return;
    }
    if (shortDescription.trim().length < 20) {
      setError("Short description should be at least 20 characters.");
      return;
    }
    if (overview.trim().length < 60) {
      setError("Overview should be at least 60 characters.");
      return;
    }
    if (!/^https?:\/\//i.test(imageUrl.trim())) {
      setError("Image URL must start with http(s)://");
      return;
    }

    setError(null);
    setPending(true);

    setTimeout(() => {
      const slug = slugify(name);
      const things = thingsToDo
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload: Place = {
        id: slug || `place-${Date.now()}`,
        slug: slug || `place-${Date.now()}`,
        name: name.trim(),
        district,
        type,
        shortDescription: shortDescription.trim(),
        overview: overview.trim(),
        bestTime: bestTime.trim() || "Year-round",
        thingsToDo: things.length > 0 ? things : ["Explore at your own pace"],
        foodToTry: [],
        travelTips: [],
        images: [imageUrl.trim()],
        contacts: [
          {
            name: user.name,
            role: "Partner",
            phone: "+91 00000 00000",
          },
        ],
      };

      addPlace({
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
            Admin will review and approve before the place appears publicly.
          </p>
          <Button variant="outline" onClick={reset} className="mt-2">
            Submit another place
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 md:p-8 shadow-soft">
      <form className="space-y-5" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="pl-name">Place name</Label>
            <Input
              id="pl-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Perantapalli Ashram"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pl-district">District</Label>
            <Select value={district} onValueChange={(v) => setDistrict(v as District)}>
              <SelectTrigger id="pl-district">
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="pl-type">Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as PlaceType)}>
              <SelectTrigger id="pl-type">
                <SelectValue placeholder="Pick a type" />
              </SelectTrigger>
              <SelectContent>
                {TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pl-best">Best time to visit</Label>
            <Input
              id="pl-best"
              value={bestTime}
              onChange={(e) => setBestTime(e.target.value)}
              placeholder="November to February"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pl-short">Short description</Label>
          <Input
            id="pl-short"
            required
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="One sentence about the place — appears on the listing card."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pl-overview">Overview</Label>
          <Textarea
            id="pl-overview"
            required
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            placeholder="A paragraph or two about what makes this place special."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pl-things">Things to do</Label>
          <Textarea
            id="pl-things"
            value={thingsToDo}
            onChange={(e) => setThingsToDo(e.target.value)}
            placeholder={"Sit by the river before sunrise\nFilter coffee at the ashram tea stall"}
            rows={3}
          />
          <p className="text-xs text-muted-foreground">One activity per line.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pl-image">Cover image URL</Label>
          <Input
            id="pl-image"
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
              Submit place for review
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}

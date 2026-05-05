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
import type { District, FoodCategory, FoodItem } from "@/lib/types";

const DISTRICTS: District[] = [
  "East Godavari",
  "West Godavari",
  "Konaseema",
  "Eluru",
  "Kakinada",
];
const CATEGORIES: FoodCategory[] = [
  "Street food",
  "Traditional meals",
  "Seafood",
  "Sweets",
  "Tribal",
];

function slugify(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function FoodSubmissionForm() {
  const { user } = useAuth();
  const { addFood } = useSubmissions();

  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState<FoodCategory | "">("");
  const [district, setDistrict] = React.useState<District | "">("");
  const [location, setLocation] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const [pending, setPending] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const reset = () => {
    setName("");
    setCategory("");
    setDistrict("");
    setLocation("");
    setDescription("");
    setImageUrl("");
    setError(null);
    setSubmitted(false);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!category || !district) {
      setError("Category and district are required.");
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
      const slug = slugify(name);
      const payload: FoodItem = {
        id: slug || `food-${Date.now()}`,
        slug: slug || `food-${Date.now()}`,
        name: name.trim(),
        category,
        district,
        location: location.trim(),
        description: description.trim(),
        image: imageUrl.trim(),
      };

      addFood({
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
            Admin will review and approve before the dish appears publicly.
          </p>
          <Button variant="outline" onClick={reset} className="mt-2">
            Submit another dish
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
            <Label htmlFor="fd-name">Dish name</Label>
            <Input
              id="fd-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Pulasa Pulusu"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fd-category">Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as FoodCategory)}>
              <SelectTrigger id="fd-category">
                <SelectValue placeholder="Pick a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="fd-district">District</Label>
            <Select value={district} onValueChange={(v) => setDistrict(v as District)}>
              <SelectTrigger id="fd-district">
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
            <Label htmlFor="fd-location">Where to find it</Label>
            <Input
              id="fd-location"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Sivalayam Street, Rajamahendravaram"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fd-desc">Description</Label>
          <Textarea
            id="fd-desc"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What it tastes like, what makes it special, when to eat it."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fd-image">Cover image URL</Label>
          <Input
            id="fd-image"
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
              Submit dish for review
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}

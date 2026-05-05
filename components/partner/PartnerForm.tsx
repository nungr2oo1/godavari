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
import { useApplications } from "@/context/applications-context";
import type { District, ServiceType } from "@/lib/types";

const DISTRICTS: District[] = [
  "East Godavari",
  "West Godavari",
  "Konaseema",
  "Eluru",
  "Kakinada",
];

const SERVICE_TYPES: ServiceType[] = ["Guide", "Boat Operator", "Homestay", "Food Experience"];

export function PartnerForm() {
  const { user } = useAuth();
  const { addApplication } = useApplications();

  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [whatsapp, setWhatsapp] = React.useState("");
  const [district, setDistrict] = React.useState<District | "">("");
  const [serviceType, setServiceType] = React.useState<ServiceType | "">("");
  const [years, setYears] = React.useState("");
  const [languages, setLanguages] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [pending, setPending] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (user?.name) {
      setFullName((prev) => prev || user.name);
    }
  }, [user]);

  const reset = () => {
    setFullName(user?.name ?? "");
    setPhone("");
    setWhatsapp("");
    setDistrict("");
    setServiceType("");
    setYears("");
    setLanguages("");
    setDescription("");
    setError(null);
    setSubmitted(false);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!district) {
      setError("Please select a district.");
      return;
    }
    if (!serviceType) {
      setError("Please select a service type.");
      return;
    }
    if (description.trim().length < 30) {
      setError("Tell us a little more — at least 30 characters about what you offer.");
      return;
    }
    const yearsNum = Number(years);
    if (!Number.isFinite(yearsNum) || yearsNum < 0) {
      setError("Please enter a valid number for years of experience.");
      return;
    }
    const langs = languages
      .split(",")
      .map((l) => l.trim())
      .filter(Boolean);
    if (langs.length === 0) {
      setError("Please list at least one language you speak.");
      return;
    }

    setError(null);
    setPending(true);

    setTimeout(() => {
      addApplication({
        userId: user?.id,
        fullName: fullName.trim(),
        phone: phone.trim(),
        whatsapp: whatsapp.trim() || undefined,
        district,
        serviceType,
        description: description.trim(),
        yearsExperience: yearsNum,
        languages: langs,
      });
      setPending(false);
      setSubmitted(true);
    }, 700);
  };

  if (submitted) {
    return (
      <Card className="p-6 md:p-8 shadow-soft">
        <div className="text-center py-8 space-y-4">
          <div className="mx-auto h-12 w-12 grid place-items-center rounded-full border border-border bg-background text-foreground">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h2 className="font-serif text-2xl md:text-[28px] font-medium leading-snug">
            Application submitted.
          </h2>
          <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
            We&apos;ll review and get back to you. Thanks for offering your time and place to
            travelers headed to the Godavaris.
          </p>
          <Button variant="outline" onClick={reset} className="mt-2">
            Submit another application
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
            <Label htmlFor="p-name">Full name</Label>
            <Input
              id="p-name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Lakshmi Devi"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="p-phone">Phone</Label>
            <Input
              id="p-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="p-whatsapp">
              WhatsApp <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Input
              id="p-whatsapp"
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+91 98765 43210"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="p-years">Years of experience</Label>
            <Input
              id="p-years"
              type="number"
              min={0}
              required
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="5"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="p-district">District</Label>
            <Select value={district} onValueChange={(v) => setDistrict(v as District)}>
              <SelectTrigger id="p-district">
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
            <Label htmlFor="p-service">Service type</Label>
            <Select value={serviceType} onValueChange={(v) => setServiceType(v as ServiceType)}>
              <SelectTrigger id="p-service">
                <SelectValue placeholder="What do you offer?" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_TYPES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="p-langs">Languages spoken</Label>
          <Input
            id="p-langs"
            required
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            placeholder="Telugu, English, Hindi"
          />
          <p className="text-xs text-muted-foreground">Comma-separated.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="p-desc">About your service</Label>
          <Textarea
            id="p-desc"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell travelers what makes your homestay/boat/walk special — what they'll see, eat, and remember."
            rows={5}
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
              Submit application
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          We&apos;ll review applications manually and reach out by phone or WhatsApp.
        </p>
      </form>
    </Card>
  );
}

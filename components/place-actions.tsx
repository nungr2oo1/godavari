"use client";

import * as React from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SaveButton } from "@/components/ui/SaveButton";
import { CallbackModal } from "@/components/modals/CallbackModal";
import { useSaved } from "@/context/saved-context";
import { useAuth } from "@/context/auth-context";

type PlaceActionsProps = {
  placeId: string;
  placeName: string;
};

export function PlaceActions({ placeId, placeName }: PlaceActionsProps) {
  const { isSaved, toggleSave } = useSaved();
  const { requireAuth } = useAuth();
  const [callbackOpen, setCallbackOpen] = React.useState(false);
  const saved = isSaved("places", placeId);

  const onRequestCallback = () => {
    requireAuth(() => setCallbackOpen(true));
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <SaveButton
          isSaved={saved}
          onToggle={() => toggleSave("places", placeId)}
          variant="inline"
          label={saved ? "Saved" : "Save place"}
        />
        <Button variant="outline" onClick={onRequestCallback}>
          <Phone className="h-4 w-4" />
          Request callback
        </Button>
      </div>
      <CallbackModal
        open={callbackOpen}
        onClose={() => setCallbackOpen(false)}
        placeId={placeId}
        placeName={placeName}
      />
    </>
  );
}

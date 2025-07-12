'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export default function SnapAndSearch() {
  const [open, setOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      // Reset state when dialog opens
      setHasCameraPermission(null);

      const getCameraPermission = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
           console.error('Camera API not supported');
           setHasCameraPermission(false);
           toast({
            variant: 'destructive',
            title: 'Unsupported Browser',
            description: 'Your browser does not support camera access.',
          });
           return;
        }
        
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings to use this feature.',
          });
        }
      };

      getCameraPermission();

      // Cleanup function to stop video stream when component unmounts or dialog closes
      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
        }
      };
    }
  }, [open, toast]);

  const handleFileSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fileInput = event.currentTarget.elements.namedItem('image-upload') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      toast({
        title: 'Image Submitted!',
        description: 'Searching for similar items...',
      });
      setOpen(false);
    } else {
      toast({
        variant: 'destructive',
        title: 'No File Selected',
        description: 'Please select an image file to search.',
      });
    }
  };

  const handleCameraSearch = () => {
    toast({
        title: 'Image Captured!',
        description: 'Searching for similar items based on the camera feed...',
    });
    setOpen(false);
  }

  return (
    <section id="snap-and-search" className="w-full py-12 md:py-24 lg:py-32 bg-card text-center">
      <div className="container px-4 md:px-6">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Snap & Search It
        </h2>
        <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl my-4">
          Find similar products by uploading an image or taking a photo.
        </p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="lg">
              <Camera className="mr-2 h-5 w-5" />
              Try Image Search
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Image Search</DialogTitle>
              <DialogDescription>
                Find items by uploading an image or using your camera.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="upload">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </TabsTrigger>
                <TabsTrigger value="camera">
                  <Camera className="mr-2 h-4 w-4" />
                  Use Camera
                </TabsTrigger>
              </TabsList>
              <TabsContent value="upload">
                <form className="space-y-4 py-4" onSubmit={handleFileSearch}>
                  <Input id="image-upload" name="image-upload" type="file" accept="image/*" />
                  <Button type="submit" className="w-full">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="camera">
                <div className="space-y-4 py-4">
                  <div className="rounded-md border bg-muted overflow-hidden">
                    <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted playsInline />
                  </div>
                  {hasCameraPermission === false && (
                    <Alert variant="destructive">
                      <AlertTitle>Camera Access Required</AlertTitle>
                      <AlertDescription>
                        Please allow camera access in your browser to use this feature. You might need to refresh the page after granting permissions.
                      </AlertDescription>
                    </Alert>
                  )}
                  <Button type="button" className="w-full" disabled={!hasCameraPermission} onClick={handleCameraSearch}>
                    <Camera className="mr-2 h-4 w-4" />
                    Snap & Search
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

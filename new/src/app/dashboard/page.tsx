import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockItems, mockUsers, mockSwaps } from '@/lib/mock-data';
import ItemCard from '@/components/item-card';
import { Separator } from '@/components/ui/separator';
import { ArrowRightLeft, Edit } from 'lucide-react';

export default function DashboardPage() {
  const currentUser = mockUsers[0];
  const userItems = mockItems.filter((item) => item.userId === currentUser.id);
  const userSwaps = mockSwaps.filter((swap) => swap.fromUser.id === currentUser.id || swap.toUser.id === currentUser.id);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Image
            src={currentUser.avatarUrl}
            width={80}
            height={80}
            alt={currentUser.name}
            className="rounded-full"
            data-ai-hint="user avatar"
          />
          <div>
            <h1 className="text-3xl font-bold font-headline">{currentUser.name}</h1>
            <p className="text-muted-foreground">Points Balance: {currentUser.points}</p>
          </div>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0">
          <Edit className="mr-2 h-4 w-4"/>
          Edit Profile
        </Button>
      </div>

      <Tabs defaultValue="items">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="items">My Items</TabsTrigger>
          <TabsTrigger value="swaps">Swaps</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="items">
          <Card>
            <CardHeader>
              <CardTitle>My Listed Items</CardTitle>
              <CardDescription>Items you have uploaded for swapping.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {userItems.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="swaps">
          <Card>
            <CardHeader>
              <CardTitle>Swap History</CardTitle>
              <CardDescription>Your ongoing and completed swaps.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {userSwaps.map((swap) => (
                <div key={swap.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Image src={swap.itemOffered.images[0]} alt={swap.itemOffered.title} width={64} height={64} className="rounded-md" data-ai-hint="fashion clothes"/>
                      <ArrowRightLeft className="text-muted-foreground" />
                      <Image src={swap.itemRequested.images[0]} alt={swap.itemRequested.title} width={64} height={64} className="rounded-md" data-ai-hint="fashion clothes"/>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${swap.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{swap.status}</p>
                      <p className="text-sm text-muted-foreground">
                        With {swap.toUser.id === currentUser.id ? swap.fromUser.name : swap.toUser.name}
                      </p>
                    </div>
                  </div>
                  <Separator className="my-4"/>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>Manage your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p><strong>Name:</strong> {currentUser.name}</p>
              <p><strong>Email:</strong> {currentUser.name.toLowerCase()}@example.com</p>
              <p><strong>Points:</strong> {currentUser.points}</p>
              <Button>Update Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockItems } from "@/lib/mock-data";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Trash2 } from "lucide-react";

export default function AdminPage() {
  const pendingItems = mockItems.slice(0, 3).map(i => ({...i, status: 'Pending' as const}));
  const allItems = mockItems;
  const rejectedItems = mockItems.slice(3, 4);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Admin Panel</CardTitle>
          <CardDescription>
            Moderate item listings and manage the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending">
            <TabsList>
              <TabsTrigger value="pending">Pending Approval</TabsTrigger>
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="rejected">Rejected Items</TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Items</CardTitle>
                  <CardDescription>These items are awaiting your review.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium flex items-center gap-4">
                             <Image src={item.images[0]} alt={item.title} width={40} height={40} className="rounded-md" data-ai-hint="fashion clothes"/>
                             {item.title}
                          </TableCell>
                          <TableCell>{item.user?.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{item.status}</Badge>
                          </TableCell>
                          <TableCell className="flex gap-2">
                            <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700">
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
             <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>All Items</CardTitle>
                  <CardDescription>A complete list of all items on the platform.</CardDescription>
                </CardHeader>
                <CardContent>
                   <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium flex items-center gap-4">
                            <Image src={item.images[0]} alt={item.title} width={40} height={40} className="rounded-md" data-ai-hint="fashion clothes"/>
                             {item.title}
                          </TableCell>
                          <TableCell>{item.user?.name}</TableCell>
                          <TableCell>
                            <Badge variant={item.status === 'Available' ? 'default' : 'secondary'}>{item.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

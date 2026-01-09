import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { createClient } from "../../lib/supabase/server" 
import { redirect } from "next/navigation"
import { signup } from "../app/login/actions"

export async function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>
            Sign up with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signup}>  {/* Changed to use action directly */}
            <FieldGroup>
              {/* Social buttons */}
              <Field>
                <Button variant="outline" type="button">
                  {/* Apple button SVG */}
                  Sign up with Apple
                </Button>
                <Button variant="outline" type="button">
                  {/* Google button SVG */}
                  Sign up with Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor="fullname">Full Name</FieldLabel>
                <Input
                  id="fullname"
                  name="fullname"  // Add name for FormData
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  name="username"  // Add name for FormData
                  type="text"
                  placeholder="johndoe"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"  // Add name for FormData
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input 
                  id="password" 
                  name="password"  // Add name for FormData
                  type="password" 
                  required 
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirm Password
                </FieldLabel>
                <Input 
                  id="confirm-password" 
                  name="confirm-password"  // Add name for FormData
                  type="password" 
                  required 
                />
              </Field>
              <Field>
                <Button type="submit">Sign up</Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
ALTER TABLE "user_books" RENAME COLUMN "progress" TO "current_page";--> statement-breakpoint
ALTER TABLE "user_books" ALTER COLUMN "total_pages" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "books_external_id_unique" UNIQUE("external_id");--> statement-breakpoint
ALTER TABLE "user_books" ADD CONSTRAINT "current_page_valid" CHECK ("user_books"."current_page" >= 0);--> statement-breakpoint
ALTER TABLE "user_books" ADD CONSTRAINT "total_pages_valid" CHECK ("user_books"."total_pages" >= 0);--> statement-breakpoint
ALTER TABLE "user_books" ADD CONSTRAINT "current_page_progression" CHECK ("user_books"."current_page" <= "user_books"."total_pages");--> statement-breakpoint
ALTER TABLE "user_books" ADD CONSTRAINT "valid_rating" CHECK ("user_books"."rating" >= 0 AND "user_books"."rating" <= 10);
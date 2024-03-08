from PIL import Image
import os

def compress_image(input_path, output_path, quality=60):
    with Image.open(input_path) as img:
        img.save(output_path, quality=quality)
        print("compressed: ", output_path)

def create_thumbnail(input_path, output_path, percentage=5):
    with Image.open(input_path) as img:
        width, height = img.size
        new_width = int(width * (percentage / 100))
        new_height = int(height * (percentage / 100))

        img.thumbnail((new_width, new_height))
        img.save(output_path)
        print("compressed: ", output_path)


def process_images():
    # Process each image in the folder
    for filename in os.listdir(originals_path):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            input_path = os.path.join(originals_path, filename)

            # Compress image
            compressed_output = os.path.join(compressed_path, filename)
            compress_image(input_path, compressed_output)

            # Create thumbnail
            thumbnail_output = os.path.join(thumbnails_path, filename)
            create_thumbnail(input_path, thumbnail_output)

if __name__ == "__main__":
    originals_path = "./original"
    compressed_path = "./compressed"
    thumbnails_path = "./thumbnail"

    process_images()
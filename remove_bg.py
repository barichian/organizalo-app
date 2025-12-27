from PIL import Image, ImageDraw
import sys

def remove_background(input_path, output_path):
    print(f"Processing {input_path}...")
    try:
        img = Image.open(input_path).convert("RGBA")
        
        # Get background color from top-left corner
        bg_color = img.getpixel((0, 0))
        print(f"Detected background color: {bg_color}")
        
        # Use floodfill to make background transparent
        # We need to handle tolerance. Pillow's floodfill allows 'thresh' since version 9+? 
        # Actually ImageDraw.floodfill doesn't support tolerance natively easily in older versions, 
        # but let's try a custom BFS for robust tolerance if needed.
        # However, for a solid background, exact match + small tolerance is fine.
        
        width, height = img.size
        pixels = img.load()
        
        # Check if background is essentially black/dark
        is_dark_bg = sum(bg_color[:3]) < 100
        
        # BFS for flood fill with tolerance
        queue = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
        visited = set(queue)
        
        # Increased tolerance to catch artifacts broadly
        tolerance = 50
        
        target_r, target_g, target_b = bg_color[:3]
        
        # 1. REMOVE BACKGROUND
        while queue:
            x, y = queue.pop(0)
            pixels[x, y] = (0, 0, 0, 0)
            
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                    r, g, b, a = pixels[nx, ny]
                    if a == 0:
                        visited.add((nx, ny))
                        continue
                    
                    diff = abs(r - target_r) + abs(g - target_g) + abs(b - target_b)
                    if diff < tolerance:
                        visited.add((nx, ny))
                        queue.append((nx, ny))
                        pixels[nx, ny] = (0, 0, 0, 0)

        # 2. CLEANING: KEEP LARGEST COMPONENT ONLY
        # Find all opaque pixels
        opaque_pixels = set()
        for x in range(width):
            for y in range(height):
                if pixels[x, y][3] > 0:
                    opaque_pixels.add((x, y))
        
        print(f"Found {len(opaque_pixels)} candidate logo pixels.")
        
        largest_cluster = set()
        
        while opaque_pixels:
            # Start a new cluster
            start_node = opaque_pixels.pop()
            cluster = {start_node}
            cluster_queue = [start_node]
            
            while cluster_queue:
                cx, cy = cluster_queue.pop(0)
                
                for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    cnx, cny = cx + dx, cy + dy
                    if (cnx, cny) in opaque_pixels:
                        opaque_pixels.remove((cnx, cny))
                        cluster.add((cnx, cny))
                        cluster_queue.append((cnx, cny))
            
            # Check if this cluster is the biggest found so far
            if len(cluster) > len(largest_cluster):
                largest_cluster = cluster
        
        print(f"Largest cluster size: {len(largest_cluster)}")
        
        # 3. REBUILD IMAGE WITH ONLY LARGEST CLUSTER
        new_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
        new_pixels = new_img.load()
        for x, y in largest_cluster:
            new_pixels[x, y] = pixels[x, y]
            
        img = new_img

        # 4. AUTO-CROP
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)
            print(f"Auto-cropped logo to {img.size}")

        # Resize for web optimization
        img.thumbnail((512, 512), Image.Resampling.LANCZOS)
        
        img.save(output_path, "PNG")
        print(f"Saved transparent logo to {output_path}")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    # Correct input file from user upload
    input_file = r"C:\Users\User\.gemini\antigravity\brain\077e7690-4d57-42fa-bc97-49178f90fac0\uploaded_image_1_1766808811913.png"
    # Output to the app
    output_file = r"c:\Users\User\.gemini\antigravity\scratch\organizalo-app\apps\landing\public\brand-logo.png"
    
    remove_background(input_file, output_file)

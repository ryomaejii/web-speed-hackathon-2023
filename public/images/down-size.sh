#!/bin/sh

# カレントディレクトリ以下の全てのwebpファイルを検索し、それぞれを1024pxの幅で最適化
find . -type f -iname "*.webp" -exec sh -c '
  for image; do
    # 画像を1024pxの幅にリサイズし、品質を維持して再保存
    magick convert "$image" -resize 1024x1024\> -quality 80 "$image"
  done
' sh {} +
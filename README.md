# XOX Game

### Algorithm :

- Oyun Tahtası: İlk olarak, bir oyun tahtası oluştur. Bu tahta genellikle 3x3'lük bir matris şeklinde olur.
- Oyuncu Sıraları: X ve O oyuncularını temsil etmek için sırayla X ve O hamleleri yapacak şekilde oyuncu sıralarını belirle.
- Hamle Yapma: Oyuncular sırayla hamle yaparlar. Her hamlede, oyuncu boş bir hücreye işareti (X veya O) koyar.
- Kazanan Kontrolü: Her hamleden sonra, kazananın olup olmadığını kontrol et. X veya O'nun aynı satırda, sütunda veya çaprazda üç tane olduğunu kontrol ederek kazanan belirlenebilir.
- Berabere Kontrolü: Eğer tüm hücreler doluysa ve kazanan yoksa, oyun berabere biter.

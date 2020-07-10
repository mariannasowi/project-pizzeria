
# Rezerwacje z zakresu dat

http://localhost:3131
/
booking
?
date_gte=2019-01-01
&
date_lte=2019-12-31

# Wydarzenie jednorazowe z zakresu dat

http://localhost:3131/event?
repeat=false&date_gte=2019-01-01&
date_lte=2019-12-31

# Wydarzenie codzienne, których rozpoczęcie jest przed datą

http://localhost:3131/event?
repeat_ne=false&date_lte=2019-12-31
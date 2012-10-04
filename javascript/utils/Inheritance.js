function inherits(base, extension)
{
   for ( var property in base )
   {
      try
      {
         extension[property] = base[property];
      }
      catch( warning ){}
   }
}

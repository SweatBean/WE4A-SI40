<?php

namespace Entities;
use Doctrine\ORM\Mapping as ORM;
#[ORM\Entity]
class Cour
{
    private int $id_cour;
    private string $nom;
    private string $description;
    private string $image;
}